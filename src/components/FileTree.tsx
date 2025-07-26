import { useState } from 'react'
import { 
  Folder, 
  FolderOpen, 
  File, 
  FileCode, 
  ChevronRight, 
  ChevronDown,
  AlertTriangle,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface FileNode {
  id: string
  name: string
  type: 'file' | 'folder'
  path: string
  children?: FileNode[]
  hasIssues?: boolean
  issueCount?: number
  issueType?: 'error' | 'warning' | 'suggestion'
}

const mockFileTree: FileNode[] = [
  {
    id: '1',
    name: 'src',
    type: 'folder',
    path: '/src',
    children: [
      {
        id: '2',
        name: 'components',
        type: 'folder',
        path: '/src/components',
        children: [
          {
            id: '3',
            name: 'UserProfile.tsx',
            type: 'file',
            path: '/src/components/UserProfile.tsx',
            hasIssues: true,
            issueCount: 3,
            issueType: 'warning'
          },
          {
            id: '4',
            name: 'Dashboard.tsx',
            type: 'file',
            path: '/src/components/Dashboard.tsx',
            hasIssues: true,
            issueCount: 1,
            issueType: 'error'
          }
        ]
      },
      {
        id: '5',
        name: 'utils',
        type: 'folder',
        path: '/src/utils',
        children: [
          {
            id: '6',
            name: 'api.ts',
            type: 'file',
            path: '/src/utils/api.ts',
            hasIssues: true,
            issueCount: 5,
            issueType: 'suggestion'
          },
          {
            id: '7',
            name: 'helpers.ts',
            type: 'file',
            path: '/src/utils/helpers.ts'
          }
        ]
      }
    ]
  },
  {
    id: '8',
    name: 'package.json',
    type: 'file',
    path: '/package.json'
  }
]

interface FileTreeItemProps {
  node: FileNode
  level: number
  onFileSelect: (file: FileNode) => void
  selectedFile?: string
}

function FileTreeItem({ node, level, onFileSelect, selectedFile }: FileTreeItemProps) {
  const [isExpanded, setIsExpanded] = useState(level === 0)
  const isSelected = selectedFile === node.id
  
  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith('.tsx') || fileName.endsWith('.ts')) {
      return <FileCode className="h-4 w-4 text-blue-500" />
    }
    return <File className="h-4 w-4 text-muted-foreground" />
  }

  const getIssueIcon = (type?: 'error' | 'warning' | 'suggestion') => {
    if (!type) return null
    
    switch (type) {
      case 'error':
        return <AlertTriangle className="h-3 w-3 text-status-error" />
      case 'warning':
        return <AlertCircle className="h-3 w-3 text-status-warning" />
      case 'suggestion':
        return <CheckCircle className="h-3 w-3 text-status-success" />
      default:
        return null
    }
  }

  const handleClick = () => {
    if (node.type === 'folder') {
      setIsExpanded(!isExpanded)
    } else {
      onFileSelect(node)
    }
  }

  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-2 py-1.5 px-3 rounded-md cursor-pointer transition-all duration-200 hover:bg-muted/50 group",
          isSelected && "bg-primary/10 text-primary border-l-2 border-primary",
          level > 0 && "ml-4"
        )}
        style={{ paddingLeft: `${level * 12 + 12}px` }}
        onClick={handleClick}
      >
        {node.type === 'folder' && (
          <div className="transition-transform duration-200">
            {isExpanded ? (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
        )}
        
        <div className="flex-shrink-0">
          {node.type === 'folder' ? (
            isExpanded ? (
              <FolderOpen className="h-4 w-4 text-primary" />
            ) : (
              <Folder className="h-4 w-4 text-muted-foreground" />
            )
          ) : (
            getFileIcon(node.name)
          )}
        </div>

        <span className={cn(
          "flex-1 text-sm font-body truncate",
          isSelected ? "font-medium" : "font-normal"
        )}>
          {node.name}
        </span>

        {node.hasIssues && (
          <div className="flex items-center gap-1 flex-shrink-0">
            {getIssueIcon(node.issueType)}
            <span className={cn(
              "text-xs px-1.5 py-0.5 rounded-full font-medium",
              node.issueType === 'error' && "bg-status-error/10 text-status-error",
              node.issueType === 'warning' && "bg-status-warning/10 text-status-warning",
              node.issueType === 'suggestion' && "bg-status-success/10 text-status-success"
            )}>
              {node.issueCount}
            </span>
          </div>
        )}
      </div>

      {node.type === 'folder' && isExpanded && node.children && (
        <div className="transition-all duration-200">
          {node.children.map((child) => (
            <FileTreeItem
              key={child.id}
              node={child}
              level={level + 1}
              onFileSelect={onFileSelect}
              selectedFile={selectedFile}
            />
          ))}
        </div>
      )}
    </div>
  )
}

interface FileTreeProps {
  onFileSelect: (file: FileNode) => void
  selectedFile?: string
}

export function FileTree({ onFileSelect, selectedFile }: FileTreeProps) {
  return (
    <div className="w-full">
      <div className="border-b border-border pb-3 mb-3">
        <h3 className="text-sm font-headline font-semibold text-foreground">Project Files</h3>
        <p className="text-xs text-muted-foreground font-body">Select a file to analyze</p>
      </div>
      
      <div className="space-y-1">
        {mockFileTree.map((node) => (
          <FileTreeItem
            key={node.id}
            node={node}
            level={0}
            onFileSelect={onFileSelect}
            selectedFile={selectedFile}
          />
        ))}
      </div>
    </div>
  )
}

export type { FileNode }