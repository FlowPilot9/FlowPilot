import { domMax } from "framer-motion";

// Default export so LazyMotion's dynamic-import loader (`() =>
// import("./motion-features").then((mod) => mod.default)`) can pull this
// in as its own async chunk instead of it being bundled into the initial
// JS. `domMax` (not the lighter `domAnimation`) is required because
// Nav.tsx uses `layoutId` for the shared "active pill" animation, which
// needs the layout-measurement features only domMax includes.
export default domMax;
