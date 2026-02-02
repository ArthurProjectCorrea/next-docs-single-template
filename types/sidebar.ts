import type { ReactNode } from 'react';

/**
 * Represents a node in the documentation tree structure
 * Used by the sidebar to render navigation
 */
export interface TreeNode {
  $id?: string;
  name?: ReactNode;
  children?: TreeNode[];
  url?: string;
  type?: string;
  index?: TreeNode;
}

/**
 * Represents a node in the page tree structure
 * Extended version with additional metadata for sorting
 */
export interface PageTreeNode {
  type: 'page' | 'folder';
  name: string;
  url?: string;
  children?: PageTreeNode[];
  index?: { url: string };
  $id?: string;
  $ref?: { file: string };
  [key: string]: unknown;
}

/**
 * Represents a navigation item in the sidebar
 * Converted from TreeNode for easier rendering
 */
export interface NavItem {
  title: string;
  url?: string;
  items?: NavItem[];
  defaultOpen?: boolean;
  id?: string;
  group?: string;
}

/**
 * Props for the tree structure passed to sidebar
 */
export interface SidebarTree {
  children: TreeNode[];
}

/**
 * Version metadata information
 * Used by version switcher component
 */
export interface VersionInfo {
  name: string;
  semver: string;
  isLatest: boolean;
}
