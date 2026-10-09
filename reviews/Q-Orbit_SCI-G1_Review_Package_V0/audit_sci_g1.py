#!/usr/bin/env python3
"""Internal consistency checks for the Q-Orbit SCI-G1 review package."""

from __future__ import annotations

import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path


PACKAGE = Path(__file__).resolve().parent
WORKSPACE = PACKAGE.parents[1]
REGISTER = WORKSPACE / "all_chapters_review" / "Q-Orbit_Chapters_1-3_Controlled_Registers_V0.2.md"
CHAPTER4 = (
    WORKSPACE
    / "all_chapters_review"
    / "Q-Orbit"
    / "Q-Orbit_Engineering_Design_Handbook_V0.2_Chapter_4.md"
)

DOCS = sorted(PACKAGE.glob("*.md"))
FIGURE = PACKAGE / "figures" / "FIG-011_Q-Orbit_Scientific_Analysis_Pipeline_V0.4.svg"


def controlled_ids(text: str, prefix: str) -> set[str]:
    return set(re.findall(rf"\b{re.escape(prefix)}-\d{{3}}\b", text))


def check_markdown_tables(path: Path, text: str, errors: list[str]) -> None:
    lines = text.splitlines()
    index = 0
    while index + 1 < len(lines):
        header = lines[index]
        separator = lines[index + 1]
        if header.startswith("|") and separator.startswith("|") and re.fullmatch(
            r"\|(?:\s*:?-+:?\s*\|)+", separator
        ):
            expected = header.count("|")
            cursor = index + 2
            while cursor < len(lines) and lines[cursor].startswith("|"):
                actual = lines[cursor].count("|")
                if actual != expected:
                    errors.append(
                        f"{path.name}:{cursor + 1}: table has {actual} pipes; expected {expected}"
                    )
                cursor += 1
            index = cursor
        else:
            index += 1


def main() -> int:
    errors: list[str] = []
    if len(DOCS) < 4:
        errors.append(f"expected at least four Markdown artifacts, found {len(DOCS)}")

    register_text = REGISTER.read_text(encoding="utf-8")
    chapter4_text = CHAPTER4.read_text(encoding="utf-8")
    valid = {
        "CE": controlled_ids(register_text, "CE"),
        "ED": controlled_ids(register_text, "ED"),
        "A": controlled_ids(register_text, "A"),
        "TBD": controlled_ids(register_text, "TBD"),
        "REQ": set(re.findall(r"\bREQ-[A-Z]+-\d{3}\b", chapter4_text)),
    }

    combined = ""
    for path in DOCS:
        text = path.read_text(encoding="utf-8")
        combined += "\n" + text
        check_markdown_tables(path, text, errors)
        for prefix, allowed in valid.items():
            pattern = r"\bREQ-[A-Z]+-\d{3}\b" if prefix == "REQ" else rf"\b{prefix}-\d{{3}}\b"
            for identifier in set(re.findall(pattern, text)):
                if identifier not in allowed:
                    errors.append(f"{path.name}: unresolved controlled ID {identifier}")

    required_phrases = [
        "SCI-G1 review candidate; gate not passed",
        "Simulation state | **NOT RUN**",
        "ARCH-G1 remains not passed",
        "No numeric Q-Orbit parameter set is frozen",
        "OUT-1",
        "OUT-2",
        "OUT-3",
        "OUT-4",
        "PR-GATE-01",
    ]
    for phrase in required_phrases:
        if phrase.casefold() not in combined.casefold():
            errors.append(f"missing required control phrase: {phrase}")

    forbidden_patterns = {
        "executed simulation claim": r"^\s*(?:the |a )?simulation (?:has been|was) (?:run|executed)[.!]?\s*$",
        "positive result claim": r"\bQ-Orbit (?:achieved|generated|demonstrated) (?:a )?(?:positive|secret|accepted) key\b",
        "gate passed claim": r"^\s*(?:\|\s*)?SCI-G1\s*(?::|\|).*\bPASSED\b",
        "architecture passed claim": r"^\s*(?:\|\s*)?ARCH-G1\s*(?::|\|).*\bPASSED\b",
    }
    for label, pattern in forbidden_patterns.items():
        if re.search(pattern, combined, re.IGNORECASE | re.MULTILINE):
            errors.append(f"forbidden {label}")

    parameter_text = (
        PACKAGE / "Q-Orbit_Chapter_6_Parameter_and_Provenance_Register_V0.4.md"
    ).read_text(encoding="utf-8")
    parameter_ids = re.findall(
        r"^\| ((?:CASE|TIME|ORB|SITE|GEO|OPT|SRCQ|FKEY|GATE|EKM|CONS|OUT|THR|REP|REL)-\d{3}) \|",
        parameter_text,
        re.MULTILINE,
    )
    if len(parameter_ids) != len(set(parameter_ids)):
        errors.append("duplicate parameter IDs")
    if len(parameter_ids) < 50:
        errors.append(f"expected at least 50 controlled parameter IDs, found {len(parameter_ids)}")

    root = ET.parse(FIGURE).getroot()
    if root.attrib.get("viewBox") != "0 0 1600 900":
        errors.append("FIG-011 viewBox is not 0 0 1600 900")
    if root.attrib.get("role") != "img":
        errors.append("FIG-011 is missing role=img")
    namespaces = {"svg": "http://www.w3.org/2000/svg"}
    title = root.find("svg:title", namespaces)
    desc = root.find("svg:desc", namespaces)
    if title is None or not (title.text or "").strip():
        errors.append("FIG-011 is missing a title")
    if desc is None or not (desc.text or "").strip():
        errors.append("FIG-011 is missing a description")

    print(f"documents: {len(DOCS)}")
    print(f"parameter_ids: {len(parameter_ids)}")
    print(f"figure: {FIGURE.name}")
    if errors:
        for error in errors:
            print(f"ERROR: {error}")
        return 1
    print("SCI-G1 internal package audit: PASS")
    return 0


if __name__ == "__main__":
    sys.exit(main())
