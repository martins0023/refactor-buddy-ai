import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  FolderOpen, 
  FileCode, 
  Zap, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  BarChart3,
  GitBranch,
  Plus,
  ArrowRight
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface Project {
  id: string
  name: string
  path: string
  lastAnalyzed: string
  issuesFound: number
  issuesFixed: number
  language: string
  status: 'analyzing' | 'completed' | 'error'
}

interface RecentActivity {
  id: string
  type: 'analysis' | 'fix' | 'optimization'
  project: string
  description: string
  timestamp: string
  impact: 'high' | 'medium' | 'low'
}

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'E-commerce Frontend',
    path: '/Users/dev/projects/ecommerce-frontend',
    lastAnalyzed: '2 hours ago',
    issuesFound: 12,
    issuesFixed: 8,
    language: 'TypeScript',
    status: 'completed'
  },
  {
    id: '2',
    name: 'API Gateway',
    path: '/Users/dev/projects/api-gateway',
    lastAnalyzed: '1 day ago',
    issuesFound: 5,
    issuesFixed: 5,
    language: 'Node.js',
    status: 'completed'
  },
  {
    id: '3',
    name: 'Mobile App Backend',
    path: '/Users/dev/projects/mobile-backend',
    lastAnalyzed: 'Analyzing...',
    issuesFound: 0,
    issuesFixed: 0,
    language: 'Python',
    status: 'analyzing'
  }
]

const mockActivity: RecentActivity[] = [
  {
    id: '1',
    type: 'optimization',
    project: 'E-commerce Frontend',
    description: 'Applied React.memo optimization to ProductCard component',
    timestamp: '30 minutes ago',
    impact: 'high'
  },
  {
    id: '2',
    type: 'fix',
    project: 'API Gateway',
    description: 'Fixed memory leak in authentication middleware',
    timestamp: '2 hours ago',
    impact: 'high'
  },
  {
    id: '3',
    type: 'analysis',
    project: 'E-commerce Frontend',
    description: 'Completed full codebase analysis - 12 issues detected',
    timestamp: '3 hours ago',
    impact: 'medium'
  }
]

export function Dashboard() {
  const navigate = useNavigate()
  const [selectedProject, setSelectedProject] = useState<string | null>(null)

  const handleProjectSelect = (projectId: string) => {
    setSelectedProject(projectId)
    navigate(`/analysis/${projectId}`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'analyzing':
        return 'bg-status-warning/10 text-status-warning border-status-warning/20'
      case 'completed':
        return 'bg-status-success/10 text-status-success border-status-success/20'
      case 'error':
        return 'bg-status-error/10 text-status-error border-status-error/20'
      default:
        return 'bg-muted text-muted-foreground border-border'
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'bg-status-error/10 text-status-error'
      case 'medium':
        return 'bg-status-warning/10 text-status-warning'
      case 'low':
        return 'bg-status-success/10 text-status-success'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  const totalIssuesFound = mockProjects.reduce((sum, p) => sum + p.issuesFound, 0)
  const totalIssuesFixed = mockProjects.reduce((sum, p) => sum + p.issuesFixed, 0)

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-headline font-bold text-foreground">Welcome to CRON</h1>
        <p className="text-lg text-muted-foreground font-body">
          AI-powered code analysis and optimization at your fingertips
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-headline font-medium text-muted-foreground">Active Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <FolderOpen className="h-5 w-5 text-primary" />
              <span className="text-2xl font-headline font-bold text-foreground">{mockProjects.length}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-headline font-medium text-muted-foreground">Issues Detected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-status-warning" />
              <span className="text-2xl font-headline font-bold text-foreground">{totalIssuesFound}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-headline font-medium text-muted-foreground">Issues Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-status-success" />
              <span className="text-2xl font-headline font-bold text-foreground">{totalIssuesFixed}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-headline font-medium text-muted-foreground">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-status-success" />
              <span className="text-2xl font-headline font-bold text-foreground">
                {totalIssuesFound > 0 ? Math.round((totalIssuesFixed / totalIssuesFound) * 100) : 0}%
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Projects List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="font-headline">Recent Projects</CardTitle>
                  <CardDescription className="font-body">
                    Select a project to start analyzing your code
                  </CardDescription>
                </div>
                <Button variant="cron" size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  New Project
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockProjects.map((project) => (
                <div
                  key={project.id}
                  className="p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition-all duration-200 hover:scale-[1.02]"
                  onClick={() => handleProjectSelect(project.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <FileCode className="h-5 w-5 text-primary flex-shrink-0" />
                        <h3 className="text-sm font-headline font-semibold text-foreground truncate">
                          {project.name}
                        </h3>
                        <Badge variant="outline" className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                      </div>
                      
                      <p className="text-xs text-muted-foreground font-body mb-2 truncate">
                        {project.path}
                      </p>
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground font-body">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {project.lastAnalyzed}
                        </span>
                        <span>{project.language}</span>
                        {project.status === 'completed' && (
                          <span className="text-status-success">
                            {project.issuesFixed}/{project.issuesFound} fixed
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Activity Feed */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Recent Activity</CardTitle>
              <CardDescription className="font-body">
                Latest optimizations and fixes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockActivity.map((activity) => (
                <div key={activity.id} className="flex gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {activity.type === 'analysis' && <BarChart3 className="h-4 w-4 text-primary" />}
                    {activity.type === 'fix' && <CheckCircle className="h-4 w-4 text-status-success" />}
                    {activity.type === 'optimization' && <Zap className="h-4 w-4 text-status-warning" />}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-body text-foreground">{activity.description}</p>
                      <Badge variant="outline" className={getImpactColor(activity.impact)}>
                        {activity.impact}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-body">
                      <GitBranch className="h-3 w-3" />
                      <span>{activity.project}</span>
                      <span>•</span>
                      <span>{activity.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}