import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { FolderOpen, GitBranch } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface NewProjectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onProjectCreated: (project: any) => void
}

export function NewProjectDialog({ open, onOpenChange, onProjectCreated }: NewProjectDialogProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: '',
    path: '',
    language: '',
    description: '',
    gitRepository: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate required fields
      if (!formData.name || !formData.path || !formData.language) {
        toast({
          variant: "destructive",
          title: "Missing Information",
          description: "Please fill in all required fields."
        })
        return
      }

      // Create new project object
      const newProject = {
        id: Date.now().toString(),
        name: formData.name,
        path: formData.path,
        language: formData.language,
        description: formData.description,
        gitRepository: formData.gitRepository,
        lastAnalyzed: 'Never',
        issuesFound: 0,
        issuesFixed: 0,
        status: 'pending' as const,
        createdAt: new Date().toISOString()
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      onProjectCreated(newProject)
      
      toast({
        title: "Project Created",
        description: `${formData.name} has been added successfully.`
      })

      // Reset form and close dialog
      setFormData({
        name: '',
        path: '',
        language: '',
        description: '',
        gitRepository: ''
      })
      onOpenChange(false)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create project. Please try again."
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBrowseFolder = () => {
    // In a real application, this would open a file browser
    // For now, we'll just focus the path input
    const pathInput = document.getElementById('project-path')
    pathInput?.focus()
    
    toast({
      title: "File Browser",
      description: "In a real app, this would open your system's file browser."
    })
  }

  const languages = [
    'TypeScript',
    'JavaScript',
    'Python',
    'Java',
    'C#',
    'Go',
    'Rust',
    'PHP',
    'Ruby',
    'Swift'
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="font-headline">Create New Project</DialogTitle>
          <DialogDescription className="font-body">
            Add a new project to start analyzing and optimizing your code.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="project-name" className="font-body font-medium">
              Project Name *
            </Label>
            <Input
              id="project-name"
              placeholder="e.g., My Awesome App"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="project-path" className="font-body font-medium">
              Project Path *
            </Label>
            <div className="flex gap-2">
              <Input
                id="project-path"
                placeholder="/path/to/your/project"
                value={formData.path}
                onChange={(e) => setFormData(prev => ({ ...prev, path: e.target.value }))}
                required
                className="flex-1"
              />
              <Button 
                type="button" 
                variant="outline" 
                size="icon"
                onClick={handleBrowseFolder}
                className="flex-shrink-0"
              >
                <FolderOpen className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="project-language" className="font-body font-medium">
              Primary Language *
            </Label>
            <Select 
              value={formData.language} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, language: value }))}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select primary language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((language) => (
                  <SelectItem key={language} value={language}>
                    {language}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="project-description" className="font-body font-medium">
              Description
            </Label>
            <Textarea
              id="project-description"
              placeholder="Brief description of your project..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="git-repository" className="font-body font-medium">
              Git Repository (Optional)
            </Label>
            <div className="flex gap-2">
              <GitBranch className="h-4 w-4 text-muted-foreground mt-3 flex-shrink-0" />
              <Input
                id="git-repository"
                placeholder="https://github.com/username/repo"
                value={formData.gitRepository}
                onChange={(e) => setFormData(prev => ({ ...prev, gitRepository: e.target.value }))}
                className="flex-1"
              />
            </div>
          </div>
        </form>

        <DialogFooter>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="cron"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Project'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}