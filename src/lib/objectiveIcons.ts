import {
  Activity,
  Archive,
  Eye,
  FlaskConical,
  FolderKanban,
  HardHat,
  LayoutDashboard,
  Lightbulb,
  Network,
  ScanSearch,
  Search,
  Target,
  TrendingUp,
  UserCog,
  Workflow,
  type LucideIcon,
} from "lucide-react";

/** Placeholder icons for case-study objective cards (Lucide, shadcn's icon
 * set). Keyed by name so content.ts stays plain data. */
export const objectiveIcons = {
  activity: Activity,
  archive: Archive,
  eye: Eye,
  "flask-conical": FlaskConical,
  "folder-kanban": FolderKanban,
  "hard-hat": HardHat,
  "layout-dashboard": LayoutDashboard,
  lightbulb: Lightbulb,
  network: Network,
  "scan-search": ScanSearch,
  search: Search,
  target: Target,
  "trending-up": TrendingUp,
  "user-cog": UserCog,
  workflow: Workflow,
} satisfies Record<string, LucideIcon>;

export type ObjectiveIconKey = keyof typeof objectiveIcons;
