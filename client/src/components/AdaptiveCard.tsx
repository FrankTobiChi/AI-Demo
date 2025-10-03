import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { 
  ExternalLink, 
  Shield, 
  Clock, 
  Users, 
  CheckCircle, 
  XCircle,
  AlertTriangle,
  User,
  Database,
  Globe
} from "lucide-react";

interface UserData {
  username: string;
  fullname: string;
  adStatus: "Enabled" | "Disabled";
  lastLogon: string;
  groups: string[];
  vpnAssigned: boolean;
  applications: Array<{
    name: string;
    status: "Active" | "Inactive";
    adminUrl: string;
  }>;
  supportContacts: Array<{
    role: string;
    name: string;
    email: string;
  }>;
}

interface AppData {
  name: string;
  adminUrl: string;
  userUrl: string;
  description: string;
  dbType: string;
  owner: string;
  thirdParty: boolean;
  supportEmail: string;
}

interface AnomalyData {
  username: string;
  score: number;
  reason: string;
  recommendedAction: string;
}

interface ApprovalRequest {
  requestId: string;
  username: string;
  requestType: string;
  requestedBy: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
}

interface AdaptiveCardProps {
  type: "user" | "app" | "anomaly" | "approval" | "token-help";
  data?: UserData | AppData | AnomalyData | ApprovalRequest;
  onAction?: (action: string, data?: any) => void;
  className?: string;
}

export default function AdaptiveCard({ type, data, onAction, className }: AdaptiveCardProps) {
  const handleAction = (action: string, actionData?: any) => {
    console.log(`${action} triggered`, actionData);
    onAction?.(action, actionData);
  };

  if (type === "user" && data) {
    const userData = data as UserData;
    return (
      <Card className={cn("w-full max-w-2xl", className)} data-testid="card-user-info">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">{userData.fullname}</CardTitle>
            <Badge 
              variant={userData.adStatus === "Enabled" ? "default" : "destructive"}
              data-testid={`status-${userData.adStatus.toLowerCase()}`}
            >
              {userData.adStatus}
            </Badge>
          </div>
          <CardDescription>@{userData.username}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Last Logon</span>
              </div>
              <p className="text-sm font-medium" data-testid="text-last-logon">
                {new Date(userData.lastLogon).toLocaleDateString()}
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">VPN Access</span>
              </div>
              <Badge 
                variant={userData.vpnAssigned ? "default" : "secondary"}
                data-testid={`vpn-${userData.vpnAssigned ? 'assigned' : 'not-assigned'}`}
              >
                {userData.vpnAssigned ? "Assigned" : "Not Assigned"}
              </Badge>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Groups</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {userData.groups.map((group) => (
                <Badge key={group} variant="outline" data-testid={`group-${group.toLowerCase()}`}>
                  {group}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Applications</h4>
            <div className="space-y-2">
              {userData.applications.map((app) => (
                <div 
                  key={app.name} 
                  className="flex items-center justify-between p-2 rounded border border-border"
                  data-testid={`app-${app.name.toLowerCase()}`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{app.name}</span>
                    <Badge 
                      variant={app.status === "Active" ? "default" : "secondary"}
                    >
                      {app.status}
                    </Badge>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleAction("open-admin", { url: app.adminUrl, app: app.name })}
                    data-testid={`button-admin-${app.name.toLowerCase()}`}
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Admin
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Support Contacts</h4>
            {userData.supportContacts.map((contact, index) => (
              <div key={index} className="text-sm">
                <span className="font-medium">{contact.role}:</span> {contact.name} ({contact.email})
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (type === "app" && data) {
    const appData = data as AppData;
    return (
      <Card className={cn("w-full max-w-2xl", className)} data-testid="card-app-info">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-primary" />
            <CardTitle>{appData.name}</CardTitle>
            <Badge variant={appData.thirdParty ? "outline" : "default"}>
              {appData.thirdParty ? "3rd Party" : "Internal"}
            </Badge>
          </div>
          <CardDescription>{appData.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Database Type</h4>
              <Badge variant="outline">{appData.dbType}</Badge>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Owner</h4>
              <p className="text-sm">{appData.owner}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Access Links</h4>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => handleAction("open-admin", { url: appData.adminUrl })}
                data-testid="button-admin-url"
              >
                <Shield className="w-4 h-4 mr-2" />
                Admin Console
              </Button>
              <Button 
                variant="outline"
                onClick={() => handleAction("open-user", { url: appData.userUrl })}
                data-testid="button-user-url"
              >
                <Globe className="w-4 h-4 mr-2" />
                User Portal
              </Button>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-1">Support</h4>
            <p className="text-sm text-muted-foreground">{appData.supportEmail}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (type === "anomaly" && data) {
    const anomalyData = data as AnomalyData;
    const riskLevel = anomalyData.score > 0.9 ? "high" : anomalyData.score > 0.7 ? "medium" : "low";
    
    return (
      <Card className={cn("w-full max-w-2xl border-l-4", {
        "border-l-destructive": riskLevel === "high",
        "border-l-yellow-500": riskLevel === "medium", 
        "border-l-blue-500": riskLevel === "low"
      }, className)} data-testid="card-anomaly">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className={cn("w-5 h-5", {
              "text-destructive": riskLevel === "high",
              "text-yellow-500": riskLevel === "medium",
              "text-blue-500": riskLevel === "low"
            })} />
            <CardTitle className="text-lg">Security Anomaly Detected</CardTitle>
            <Badge variant={riskLevel === "high" ? "destructive" : "outline"}>
              {(anomalyData.score * 100).toFixed(0)}% Risk
            </Badge>
          </div>
          <CardDescription>User: {anomalyData.username}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Detected Issue</h4>
            <p className="text-sm">{anomalyData.reason}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Recommended Action</h4>
            <p className="text-sm text-muted-foreground">{anomalyData.recommendedAction}</p>
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={() => handleAction("view-user", { username: anomalyData.username })}
              data-testid="button-view-user"
            >
              View User Details
            </Button>
            <Button 
              variant="outline"
              onClick={() => handleAction("dismiss-anomaly", { username: anomalyData.username })}
              data-testid="button-dismiss"
            >
              Dismiss
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (type === "approval" && data) {
    const approvalData = data as ApprovalRequest;
    
    return (
      <Card className={cn("w-full max-w-2xl", className)} data-testid="card-approval">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <CardTitle>Approval Required</CardTitle>
            <Badge 
              variant={
                approvalData.status === "pending" ? "outline" :
                approvalData.status === "approved" ? "default" : "destructive"
              }
            >
              {approvalData.status.charAt(0).toUpperCase() + approvalData.status.slice(1)}
            </Badge>
          </div>
          <CardDescription>Request ID: {approvalData.requestId}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium mb-1">User</h4>
              <p className="text-sm">{approvalData.username}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">Request Type</h4>
              <p className="text-sm">{approvalData.requestType}</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-1">Requested By</h4>
            <p className="text-sm">{approvalData.requestedBy}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-1">Reason</h4>
            <p className="text-sm text-muted-foreground">{approvalData.reason}</p>
          </div>

          {approvalData.status === "pending" && (
            <div className="flex gap-2">
              <Button 
                onClick={() => handleAction("approve", { requestId: approvalData.requestId })}
                data-testid="button-approve"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Approve
              </Button>
              <Button 
                variant="destructive"
                onClick={() => handleAction("reject", { requestId: approvalData.requestId })}
                data-testid="button-reject"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Reject
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  if (type === "token-help") {
    return (
      <Card className={cn("w-full max-w-2xl", className)} data-testid="card-token-help">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <CardTitle>Token Onboarding Guide</CardTitle>
          </div>
          <CardDescription>Step-by-step token setup and status check</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
                1
              </div>
              <div>
                <h4 className="text-sm font-medium">Download Token Software</h4>
                <p className="text-sm text-muted-foreground">Install the authentication app on your device</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
                2
              </div>
              <div>
                <h4 className="text-sm font-medium">Register Token</h4>
                <p className="text-sm text-muted-foreground">Scan QR code or enter setup key manually</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
                3
              </div>
              <div>
                <h4 className="text-sm font-medium">Test Authentication</h4>
                <p className="text-sm text-muted-foreground">Verify token generates valid codes</p>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={() => handleAction("check-token-status")}
              data-testid="button-check-status"
            >
              Check Token Status
            </Button>
            <Button 
              variant="outline"
              onClick={() => handleAction("download-guide")}
              data-testid="button-download-guide"
            >
              Download PDF Guide
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
}