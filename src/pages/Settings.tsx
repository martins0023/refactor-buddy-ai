import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Palette, 
  Code, 
  Zap, 
  Shield, 
  Cloud, 
  Monitor,
  GitBranch,
  Bell,
  HardDrive
} from 'lucide-react'

const Settings = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto min-h-0">
      <div className="mb-6">
        <h1 className="text-3xl font-headline font-bold text-foreground">Settings</h1>
        <p className="text-lg text-muted-foreground font-body">
          Configure CRON to match your workflow
        </p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-primary" />
                <CardTitle className="font-headline">Appearance</CardTitle>
              </div>
              <CardDescription className="font-body">
                Customize the look and feel of CRON
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-body font-medium">Theme</p>
                  <p className="text-sm text-muted-foreground font-body">Choose your preferred theme</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Solar Flare</Button>
                  <Button variant="outline" size="sm">Dark Matter</Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-body font-medium">Auto-switch themes</p>
                  <p className="text-sm text-muted-foreground font-body">Match system preferences</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                <CardTitle className="font-headline">Notifications</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-body font-medium">Analysis complete</p>
                  <p className="text-sm text-muted-foreground font-body">Notify when code analysis finishes</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-body font-medium">Critical issues</p>
                  <p className="text-sm text-muted-foreground font-body">Alert for high-priority problems</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                <CardTitle className="font-headline">Code Analysis</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-body font-medium">Auto-analyze on save</p>
                  <p className="text-sm text-muted-foreground font-body">Run analysis when files are saved</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-body font-medium">Performance suggestions</p>
                  <p className="text-sm text-muted-foreground font-body">Include performance optimization hints</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-body font-medium">Code style checking</p>
                  <p className="text-sm text-muted-foreground font-body">Check for style and best practice violations</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Monitor className="h-5 w-5 text-primary" />
                <CardTitle className="font-headline">IDE Integrations</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                    <Code className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-body font-medium">VS Code</p>
                    <p className="text-sm text-muted-foreground font-body">Connected</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-status-success/10 text-status-success">Connected</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                    <Code className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-body font-medium">IntelliJ IDEA</p>
                    <p className="text-sm text-muted-foreground font-body">Not connected</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Connect</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <GitBranch className="h-5 w-5 text-primary" />
                <CardTitle className="font-headline">Version Control</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-body font-medium">Git integration</p>
                  <p className="text-sm text-muted-foreground font-body">Auto-commit applied fixes</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                <CardTitle className="font-headline">Performance</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-body font-medium">CPU Usage Limit</p>
                  <p className="text-sm text-muted-foreground font-body">Maximum CPU usage for analysis</p>
                </div>
                <Badge variant="outline">50%</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-body font-medium">Memory Limit</p>
                  <p className="text-sm text-muted-foreground font-body">Maximum memory usage</p>
                </div>
                <Badge variant="outline">2GB</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <CardTitle className="font-headline">Privacy & Security</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-body font-medium">Local processing only</p>
                  <p className="text-sm text-muted-foreground font-body">Never send code to external servers</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-body font-medium">Anonymous usage data</p>
                  <p className="text-sm text-muted-foreground font-body">Help improve CRON with anonymous data</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;