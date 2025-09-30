import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import InventoryManagement from './InventoryManagement'
import SalesManagement from './SalesManagement'
import PurchasesManagement from './PurchasesManagement'
import CustomersSuppliers from './CustomersSuppliers'
import AccountingReports from './AccountingReports'
import UsersManagement from './UsersManagement'
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  TrendingUp, 
  DollarSign, 
  FileText, 
  Settings,
  LogOut,
  Menu,
  X,
  Warehouse,
  Receipt,
  UserCheck,
  Calculator,
  Wallet
} from 'lucide-react'

const Dashboard = ({ user, onLogout }) => {
  const [activeModule, setActiveModule] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const modules = [
    { id: 'dashboard', name: 'لوحة التحكم', icon: LayoutDashboard, color: 'bg-blue-500' },
    { id: 'inventory', name: 'المخازن والأصناف', icon: Warehouse, color: 'bg-green-500' },
    { id: 'purchases', name: 'المشتريات', icon: ShoppingCart, color: 'bg-purple-500' },
    { id: 'sales', name: 'المبيعات', icon: Receipt, color: 'bg-orange-500' },
    { id: 'customers', name: 'العملاء والموردين', icon: Users, color: 'bg-pink-500' },
    { id: 'expenses', name: 'المصروفات', icon: DollarSign, color: 'bg-red-500' },
    { id: 'accounting', name: 'الدليل المحاسبي', icon: Calculator, color: 'bg-indigo-500' },
    { id: 'users', name: 'إدارة المستخدمين', icon: UserCheck, color: 'bg-teal-500' },
    { id: 'cashbox', name: 'الصندوق', icon: Wallet, color: 'bg-yellow-500' },
    { id: 'reports', name: 'التقارير', icon: FileText, color: 'bg-gray-500' },
  ]

  const stats = [
    { title: 'إجمالي المبيعات', value: '125,000 ر.س', change: '+12%', color: 'text-green-600' },
    { title: 'إجمالي المشتريات', value: '85,000 ر.س', change: '+8%', color: 'text-blue-600' },
    { title: 'عدد الأصناف', value: '1,250', change: '+5%', color: 'text-purple-600' },
    { title: 'رصيد الصندوق', value: '45,000 ر.س', change: '+15%', color: 'text-orange-600' },
  ]

  const recentActivities = [
    { type: 'sale', description: 'فاتورة بيع رقم #1001', amount: '2,500 ر.س', time: 'منذ 5 دقائق' },
    { type: 'purchase', description: 'فاتورة شراء رقم #2001', amount: '1,800 ر.س', time: 'منذ 15 دقيقة' },
    { type: 'expense', description: 'مصروف إيجار المحل', amount: '3,000 ر.س', time: 'منذ ساعة' },
    { type: 'inventory', description: 'جرد مخزني للأصناف', amount: '', time: 'منذ ساعتين' },
  ]

  const renderModuleContent = () => {
    const activeModuleData = modules.find(m => m.id === activeModule)
    
    if (activeModule === 'dashboard') {
      return (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <Badge variant="secondary" className={stat.color}>
                      {stat.change}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>الأنشطة الأخيرة</CardTitle>
              <CardDescription>آخر العمليات في النظام</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.type === 'sale' ? 'bg-green-500' :
                        activity.type === 'purchase' ? 'bg-blue-500' :
                        activity.type === 'expense' ? 'bg-red-500' : 'bg-gray-500'
                      }`} />
                      <div>
                        <p className="font-medium text-gray-900">{activity.description}</p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                    {activity.amount && (
                      <Badge variant="outline">{activity.amount}</Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    if (activeModule === 'inventory') {
      return <InventoryManagement />
    }

    if (activeModule === 'sales') {
      return <SalesManagement />
    }

    if (activeModule === 'purchases') {
      return <PurchasesManagement />
    }

    if (activeModule === 'customers') {
      return <CustomersSuppliers />
    }

    if (activeModule === 'expenses' || activeModule === 'accounting' || activeModule === 'reports') {
      return <AccountingReports />
    }

    if (activeModule === 'users' || activeModule === 'cashbox') {
      return <UsersManagement />
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 space-x-reverse">
            <activeModuleData.icon className="w-6 h-6" />
            <span>{activeModuleData.name}</span>
          </CardTitle>
          <CardDescription>
            هذه الوحدة قيد التطوير وستكون متاحة قريباً
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <activeModuleData.icon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {activeModuleData.name}
            </h3>
            <p className="text-gray-500">
              سيتم إضافة هذه الوحدة في التحديث القادم
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white shadow-lg transition-all duration-300 flex flex-col`}>
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <h1 className="text-xl font-bold text-gray-900">نظام المحاسبة</h1>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {modules.map((module) => (
            <button
              key={module.id}
              onClick={() => setActiveModule(module.id)}
              className={`w-full flex items-center space-x-3 space-x-reverse p-3 rounded-lg transition-colors ${
                activeModule === module.id
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                activeModule === module.id ? 'bg-blue-100' : module.color
              }`}>
                <module.icon className={`w-4 h-4 ${
                  activeModule === module.id ? 'text-blue-700' : 'text-white'
                }`} />
              </div>
              {sidebarOpen && (
                <span className="font-medium">{module.name}</span>
              )}
            </button>
          ))}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t">
          {sidebarOpen && (
            <div className="mb-3">
              <p className="text-sm font-medium text-gray-900">{user.username}</p>
              <p className="text-xs text-gray-500">مدير النظام</p>
            </div>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={onLogout}
            className="w-full"
          >
            <LogOut className="w-4 h-4" />
            {sidebarOpen && <span className="mr-2">تسجيل الخروج</span>}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              {modules.find(m => m.id === activeModule)?.name || 'لوحة التحكم'}
            </h2>
            <div className="flex items-center space-x-4 space-x-reverse">
              <Badge variant="secondary">
                مرحباً، {user.username}
              </Badge>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          {renderModuleContent()}
        </main>
      </div>
    </div>
  )
}

export default Dashboard

