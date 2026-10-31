#!/usr/bin/env python3
"""Packs roblox/src into a Roblox place file (RibcageMansion.rbxlx).

Open the .rbxlx in Roblox Studio (File > Open from File) and press Play.
No Rojo needed. Also writes roblox/sourcemap.json for luau-lsp.

Usage:  python3 tools/build_place.py
"""

import json
import os
from xml.sax.saxutils import escape

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "roblox", "src")
OUT = os.path.join(ROOT, "RibcageMansion.rbxlx")
SOURCEMAP = os.path.join(ROOT, "roblox", "sourcemap.json")

SERVICES = {"ReplicatedStorage", "ServerScriptService", "StarterPlayer", "StarterPlayerScripts", "ServerStorage"}

_ref = 0


def next_ref():
    global _ref
    _ref += 1
    return "RBX%08X" % _ref


def classify(name):
    """Returns (instance name, class name) for a file name, or None."""
    for suffix, cls in ((".server.luau", "Script"), (".client.luau", "LocalScript"), (".luau", "ModuleScript")):
        if name.endswith(suffix):
            return name[: -len(suffix)], cls
    return None


def walk(path, rel):
    """Builds a tree of {name, className, source?, filePaths?, children} nodes."""
    nodes = []
    for entry in sorted(os.listdir(path)):
        full = os.path.join(path, entry)
        relp = os.path.join(rel, entry)
        if os.path.isdir(full):
            cls = entry if entry in SERVICES else "Folder"
            nodes.append({"name": entry, "className": cls, "children": walk(full, relp)})
        else:
            info = classify(entry)
            if info:
                with open(full, encoding="utf-8") as f:
                    source = f.read()
                nodes.append({
                    "name": info[0],
                    "className": info[1],
                    "source": source,
                    "filePaths": [os.path.join("src", relp).replace(os.sep, "/")],
                    "children": [],
                })
    return nodes


def cdata(text):
    # A CDATA section cannot contain "]]>"; split it if it ever appears.
    return "<![CDATA[" + text.replace("]]>", "]]]]><![CDATA[>") + "]]>"


def to_xml(node, depth):
    pad = "  " * depth
    out = [f'{pad}<Item class="{node["className"]}" referent="{next_ref()}">', f"{pad}  <Properties>"]
    out.append(f'{pad}    <string name="Name">{escape(node["name"])}</string>')
    if "source" in node:
        out.append(f'{pad}    <ProtectedString name="Source">{cdata(node["source"])}</ProtectedString>')
    for key, (kind, value) in node.get("props", {}).items():
        out.append(f'{pad}    <{kind} name="{key}">{value}</{kind}>')
    out.append(f"{pad}  </Properties>")
    for child in node["children"]:
        out.extend(to_xml(child, depth + 1))
    out.append(f"{pad}</Item>")
    return out


def strip_source(node):
    clean = {k: v for k, v in node.items() if k not in ("source", "props")}
    clean["children"] = [strip_source(c) for c in node["children"]]
    return clean


def main():
    tree = walk(SRC, "")
    # Turn off instance streaming so every client sees the whole sea of ice.
    tree.append({
        "name": "Workspace",
        "className": "Workspace",
        "props": {"StreamingEnabled": ("bool", "false")},
        "children": [],
    })
    tree.append({"name": "ServerStorage", "className": "ServerStorage", "children": [
        {"name": "BlenderAssets", "className": "Folder", "children": []},
    ]})

    lines = [
        '<roblox xmlns:xmime="http://www.w3.org/2005/05/xmlmime" '
        'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" '
        'xsi:noNamespaceSchemaLocation="http://www.roblox.com/roblox.xsd" version="4">',
        "  <External>null</External>",
        "  <External>nil</External>",
    ]
    for node in tree:
        lines.extend(to_xml(node, 1))
    lines.append("</roblox>")
    with open(OUT, "w", encoding="utf-8", newline="\n") as f:
        f.write("\n".join(lines) + "\n")

    sourcemap = {"name": "RibcageMansion", "className": "DataModel", "children": [strip_source(n) for n in tree]}
    with open(SOURCEMAP, "w", encoding="utf-8") as f:
        json.dump(sourcemap, f, indent=1)

    print("wrote", os.path.relpath(OUT, ROOT), "and", os.path.relpath(SOURCEMAP, ROOT))


if __name__ == "__main__":
    main()
