import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  FileText, 
  Calculator, 
  TrendingUp, 
  TrendingDown,
  DollarSign, 
  Calendar,
  BarChart3,
  PieChart,
  Printer,
  Download,
  Eye,
  Building,
  Wallet,
  CreditCard,
  Target
} from 'lucide-react'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const AccountingReports = () => {
  const [activeTab, setActiveTab] = useState('chart-of-accounts')
  const [searchTerm, setSearchTerm] = useState('')
  const [chartOfAccounts, setChartOfAccounts] = useState([])
  const [expenses, setExpenses] = useState([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)

  // Sample data
  useEffect(() => {
    setChartOfAccounts([
      {
        id: 1,
        account_code: '1000',
        account_name: 'الأصول',
        account_type: 'Asset',
        parent_id: null,
        is_active: true,
        children: [
          {
            id: 2,
            account_code: '1100',
            account_name: 'الأصول المتداولة',
            account_type: 'Asset',
            parent_id: 1,
            children: [
              { id: 3, account_code: '1110', account_name: 'النقدية', account_type: 'Asset', parent_id: 2 },
              { id: 4, account_code: '1120', account_name: 'البنك', account_type: 'Asset', parent_id: 2 },
              { id: 5, account_code: '1130', account_name: 'المخزون', account_type: 'Asset', parent_id: 2 }
            ]
          },
          {
            id: 6,
            account_code: '1200',
            account_name: 'الأصول الثابتة',
            account_type: 'Asset',
            parent_id: 1,
            children: [
              { id: 7, account_code: '1210', account_name: 'المعدات', account_type: 'Asset', parent_id: 6 },
              { id: 8, account_code: '1220', account_name: 'الأثاث', account_type: 'Asset', parent_id: 6 }
            ]
          }
        ]
      },
      {
        id: 9,
        account_code: '2000',
        account_name: 'الخصوم',
        account_type: 'Liability',
        parent_id: null,
        children: [
          {
            id: 10,
            account_code: '2100',
            account_name: 'الخصوم المتداولة',
            account_type: 'Liability',
            parent_id: 9,
            children: [
              { id: 11, account_code: '2110', account_name: 'الموردين', account_type: 'Liability', parent_id: 10 },
              { id: 12, account_code: '2120', account_name: 'المصروفات المستحقة', account_type: 'Liability', parent_id: 10 }
            ]
          }
        ]
      },
      {
        id: 13,
        account_code: '3000',
        account_name: 'حقوق الملكية',
        account_type: 'Equity',
        parent_id: null,
        children: [
          { id: 14, account_code: '3100', account_name: 'رأس المال', account_type: 'Equity', parent_id: 13 },
          { id: 15, account_code: '3200', account_name: 'الأرباح المحتجزة', account_type: 'Equity', parent_id: 13 }
        ]
      },
      {
        id: 16,
        account_code: '4000',
        account_name: 'الإيرادات',
        account_type: 'Revenue',
        parent_id: null,
        children: [
          { id: 17, account_code: '4100', account_name: 'إيرادات المبيعات', account_type: 'Revenue', parent_id: 16 }
        ]
      },
      {
        id: 18,
        account_code: '5000',
        account_name: 'المصروفات',
        account_type: 'Expense',
        parent_id: null,
        children: [
          { id: 19, account_code: '5100', account_name: 'تكلفة البضاعة المباعة', account_type: 'Expense', parent_id: 18 },
          { id: 20, account_code: '5200', account_name: 'مصروفات التشغيل', account_type: 'Expense', parent_id: 18 }
        ]
      }
    ])

    setExpenses([
      {
        id: 1,
        description: 'إيجار المحل',
        amount: 5000,
        category: 'إيجار',
        expense_date: '2024-09-01',
        payment_method: 'Bank',
        reference_number: 'RENT-001'
      },
      {
        id: 2,
        description: 'فاتورة الكهرباء',
        amount: 800,
        category: 'مرافق',
        expense_date: '2024-09-15',
        payment_method: 'Cash',
        reference_number: 'ELEC-001'
      },
      {
        id: 3,
        description: 'راتب الموظف',
        amount: 4000,
        category: 'رواتب',
        expense_date: '2024-09-30',
        payment_method: 'Bank',
        reference_number: 'SAL-001'
      },
      {
        id: 4,
        description: 'مصروفات تسويق',
        amount: 1200,
        category: 'تسويق',
        expense_date: '2024-09-20',
        payment_method: 'Cash',
        reference_number: 'MKT-001'
      }
    ])
  }, [])

  // Sample financial data for charts
  const monthlyData = [
    { month: 'يناير', sales: 45000, expenses: 25000, profit: 20000 },
    { month: 'فبراير', sales: 52000, expenses: 28000, profit: 24000 },
    { month: 'مارس', sales: 48000, expenses: 26000, profit: 22000 },
    { month: 'أبريل', sales: 61000, expenses: 32000, profit: 29000 },
    { month: 'مايو', sales: 55000, expenses: 30000, profit: 25000 },
    { month: 'يونيو', sales: 67000, expenses: 35000, profit: 32000 },
    { month: 'يوليو', sales: 71000, expenses: 38000, profit: 33000 },
    { month: 'أغسطس', sales: 69000, expenses: 36000, profit: 33000 },
    { month: 'سبتمبر', sales: 74000, expenses: 39000, profit: 35000 }
  ]

  const expenseCategories = [
    { name: 'إيجار', value: 5000, color: '#8884d8' },
    { name: 'رواتب', value: 4000, color: '#82ca9d' },
    { name: 'مرافق', value: 800, color: '#ffc658' },
    { name: 'تسويق', value: 1200, color: '#ff7300' }
  ]

  const ChartOfAccountsTab = () => {
    const renderAccountTree = (accounts, level = 0) => {
      return accounts.map((account) => (
        <div key={account.id}>
          <div className={`flex items-center justify-between p-3 border-b hover:bg-gray-50 ${level > 0 ? 'mr-' + (level * 6) : ''}`}>
            <div className="flex items-center space-x-3 space-x-reverse">
              <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                {account.account_code}
              </span>
              <span className={`${level === 0 ? 'font-bold' : 'font-medium'}`}>
                {account.account_name}
              </span>
              <Badge variant="outline" className="text-xs">
                {account.account_type}
              </Badge>
            </div>
            <div className="flex space-x-2 space-x-reverse">
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="text-red-600">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
          {account.children && account.children.length > 0 && (
            <div>
              {renderAccountTree(account.children, level + 1)}
            </div>
          )}
        </div>
      ))
    }

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="البحث في الحسابات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10 w-80"
              />
            </div>
          </div>
          <Button>
            <Plus className="w-4 h-4 ml-2" />
            إضافة حساب جديد
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>الدليل المحاسبي</CardTitle>
            <CardDescription>إدارة الحسابات المحاسبية والهيكل الهرمي</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {renderAccountTree(chartOfAccounts)}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const ExpensesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="البحث في المصروفات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10 w-80"
            />
          </div>
        </div>
        <Button>
          <Plus className="w-4 h-4 ml-2" />
          إضافة مصروف جديد
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {expenses.map((expense) => (
          <Card key={expense.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{expense.description}</h3>
                  <div className="flex items-center space-x-4 space-x-reverse mt-2 text-sm text-gray-600">
                    <span className="flex items-center space-x-1 space-x-reverse">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(expense.expense_date).toLocaleDateString('ar-SA')}</span>
                    </span>
                    <span className="flex items-center space-x-1 space-x-reverse">
                      <CreditCard className="w-4 h-4" />
                      <span>{expense.payment_method === 'Cash' ? 'نقدي' : 'بنكي'}</span>
                    </span>
                    <span>المرجع: {expense.reference_number}</span>
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold text-red-600">
                    {expense.amount.toLocaleString()} ر.س
                  </p>
                  <Badge variant="secondary">{expense.category}</Badge>
                </div>
                <div className="flex space-x-2 space-x-reverse">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const ReportsTab = () => (
    <div className="space-y-6">
      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي المبيعات</p>
                <p className="text-2xl font-bold text-green-600">74,000 ر.س</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">+12% من الشهر الماضي</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي المصروفات</p>
                <p className="text-2xl font-bold text-red-600">39,000 ر.س</p>
              </div>
              <TrendingDown className="w-8 h-8 text-red-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">+8% من الشهر الماضي</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">صافي الربح</p>
                <p className="text-2xl font-bold text-blue-600">35,000 ر.س</p>
              </div>
              <Target className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">+15% من الشهر الماضي</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">هامش الربح</p>
                <p className="text-2xl font-bold text-purple-600">47%</p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">+3% من الشهر الماضي</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>الأداء المالي الشهري</CardTitle>
            <CardDescription>المبيعات والمصروفات والأرباح</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={2} name="المبيعات" />
                <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} name="المصروفات" />
                <Line type="monotone" dataKey="profit" stroke="#3b82f6" strokeWidth={2} name="الربح" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>توزيع المصروفات</CardTitle>
            <CardDescription>المصروفات حسب الفئة</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={expenseCategories}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {expenseCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Financial Reports */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Building className="w-12 h-12 mx-auto text-blue-600 mb-4" />
            <h3 className="font-semibold text-lg mb-2">الميزانية العمومية</h3>
            <p className="text-gray-600 text-sm mb-4">عرض الأصول والخصوم وحقوق الملكية</p>
            <Button variant="outline" className="w-full">
              <Eye className="w-4 h-4 ml-2" />
              عرض التقرير
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-12 h-12 mx-auto text-green-600 mb-4" />
            <h3 className="font-semibold text-lg mb-2">قائمة الدخل</h3>
            <p className="text-gray-600 text-sm mb-4">الإيرادات والمصروفات والأرباح</p>
            <Button variant="outline" className="w-full">
              <Eye className="w-4 h-4 ml-2" />
              عرض التقرير
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Wallet className="w-12 h-12 mx-auto text-purple-600 mb-4" />
            <h3 className="font-semibold text-lg mb-2">التدفقات النقدية</h3>
            <p className="text-gray-600 text-sm mb-4">حركة النقد الداخل والخارج</p>
            <Button variant="outline" className="w-full">
              <Eye className="w-4 h-4 ml-2" />
              عرض التقرير
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">الدليل المحاسبي والتقارير</h2>
        <div className="flex items-center space-x-4 space-x-reverse">
          <Badge variant="outline" className="flex items-center space-x-1 space-x-reverse">
            <Calculator className="w-4 h-4" />
            <span>{chartOfAccounts.length} حساب</span>
          </Badge>
          <Badge variant="outline" className="flex items-center space-x-1 space-x-reverse">
            <FileText className="w-4 h-4" />
            <span>{expenses.length} مصروف</span>
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="chart-of-accounts">الدليل المحاسبي</TabsTrigger>
          <TabsTrigger value="expenses">المصروفات</TabsTrigger>
          <TabsTrigger value="reports">التقارير المالية</TabsTrigger>
        </TabsList>

        <TabsContent value="chart-of-accounts">
          <ChartOfAccountsTab />
        </TabsContent>

        <TabsContent value="expenses">
          <ExpensesTab />
        </TabsContent>

        <TabsContent value="reports">
          <ReportsTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AccountingReports

