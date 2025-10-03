import AdaptiveCard from '../AdaptiveCard';

export default function AdaptiveCardExample() {
  // Mock user data
  const userData = {
    username: "alice.w",
    fullname: "Alice Walker", 
    adStatus: "Enabled" as const,
    lastLogon: "2025-09-22T08:30:00Z",
    groups: ["Finance", "VPN-Users"],
    vpnAssigned: true,
    applications: [
      { name: "Payroll", status: "Active" as const, adminUrl: "https://payroll.example/admin" },
      { name: "CRM", status: "Inactive" as const, adminUrl: "https://crm.example/admin" }
    ],
    supportContacts: [
      { role: "Supervisor", name: "Jane Doe", email: "jane.doe@example.com" }
    ]
  };

  // Mock app data
  const appData = {
    name: "Payroll",
    adminUrl: "https://payroll.example/admin",
    userUrl: "https://payroll.example",
    description: "This app is used for bulk journal posting",
    dbType: "Oracle",
    owner: "Jane Doe; e-operations; branch",
    thirdParty: false,
    supportEmail: "payroll-support@example.com"
  };

  // Mock anomaly data
  const anomalyData = {
    username: "dan.j",
    score: 0.92,
    reason: "Admin group assigned but last logon > 120 days",
    recommendedAction: "Disable or review"
  };

  // Mock approval data
  const approvalData = {
    requestId: "req-001",
    username: "alice.w",
    requestType: "Lakebaas Reset",
    requestedBy: "alice.w",
    reason: "User locked out",
    status: "pending" as const
  };

  const handleAction = (action: string, data?: any) => {
    console.log('Card action:', action, data);
  };

  return (
    <div className="p-4 space-y-6 max-w-4xl">
      <div>
        <h3 className="text-lg font-semibold mb-3">User Information Card</h3>
        <AdaptiveCard type="user" data={userData} onAction={handleAction} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Application Information Card</h3>
        <AdaptiveCard type="app" data={appData} onAction={handleAction} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Security Anomaly Card</h3>
        <AdaptiveCard type="anomaly" data={anomalyData} onAction={handleAction} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Approval Request Card</h3>
        <AdaptiveCard type="approval" data={approvalData} onAction={handleAction} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Token Help Card</h3>
        <AdaptiveCard type="token-help" onAction={handleAction} />
      </div>
    </div>
  );
}