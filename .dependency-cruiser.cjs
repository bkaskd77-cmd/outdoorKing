/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: "no-apps-imported",
      comment:
        "Nothing outside apps/ imports from apps/* — apps consume packages, not the reverse.",
      severity: "error",
      from: { pathNot: "^apps/" },
      to: { path: "^apps/" },
    },
    {
      name: "no-cross-app",
      comment: "apps/* may import packages/* and their own tree, not other apps.",
      severity: "error",
      from: { path: "^apps/([^/]+)/" },
      to: { path: "^apps/", pathNot: "^apps/$1/" },
    },
    {
      name: "ui-no-data-layer",
      comment: "packages/ui must not import db, auth, or ai.",
      severity: "error",
      from: { path: "^packages/ui/" },
      to: { path: "^packages/(db|auth|ai|content-agents|payments)/" },
    },
    {
      name: "db-no-react",
      comment: "packages/db has no React.",
      severity: "error",
      from: { path: "^packages/db/" },
      to: { path: "(^|/)react(/|$)|react-dom|next/" },
    },
    {
      name: "ai-no-ui",
      comment: "packages/ai may import db but not ui.",
      severity: "error",
      from: { path: "^packages/ai/" },
      to: { path: "^packages/ui/" },
    },
    {
      name: "content-agents-no-ui",
      comment: "Content agents are server-only.",
      severity: "error",
      from: { path: "^packages/content-agents/" },
      to: { path: "^packages/ui/" },
    },
  ],
  options: {
    doNotFollow: {
      path: "node_modules|\\.next|dist|coverage|migrations",
    },
    tsPreCompilationDeps: false,
    enhancedResolveOptions: {
      exportsFields: ["exports"],
      conditionNames: ["import", "require", "node", "default", "types"],
    },
    reporterOptions: {
      text: { highlightFocused: true },
    },
  },
};
