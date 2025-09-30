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
  Users, 
  Building, 
  Phone, 
  Mail, 
  MapPin,
  CreditCard,
  FileText,
  Printer,
  Eye,
  Receipt,
  DollarSign,
  Calendar,
  TrendingUp,
  TrendingDown
} from 'lucide-react'

const CustomersSuppliers = () => {
  const [activeTab, setActiveTab] = useState('customers')
  const [searchTerm, setSearchTerm] = useState('')
  const [customers, setCustomers] = useState([])
  const [suppliers, setSuppliers] = useState([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  const [voucherDialogOpen, setVoucherDialogOpen] = useState(false)
  const [voucherType, setVoucherType] = useState('receipt')

  // Sample data
  useEffect(() => {
    setCustomers([
      {
        id: 1,
        name: 'أحمد محمد السالم',
        phone: '0501234567',
        email: 'ahmed@example.com',
        address: 'الرياض - حي النخيل - شارع الملك فهد',
        tax_number: '123456789',
        credit_limit: 10000,
        balance: 2500,
        notes: 'عميل مميز'
      },
      {
        id: 2,
        name: 'فاطمة علي الأحمد',
        phone: '0507654321',
        email: 'fatima@example.com',
        address: 'جدة - حي الصفا - طريق الملك عبدالعزيز',
        tax_number: '987654321',
        credit_limit: 5000,
        balance: -1200,
        notes: 'دفع منتظم'
      },
      {
        id: 3,
        name: 'محمد سالم الخالد',
        phone: '0509876543',
        email: 'mohammed@example.com',
        address: 'الدمام - حي الفيصلية - شارع الأمير محمد',
        tax_number: '456789123',
        credit_limit: 15000,
        balance: 5800,
        notes: 'عميل جديد'
      }
    ])

    setSuppliers([
      {
        id: 1,
        name: 'شركة التقنية المتقدمة',
        phone: '0112345678',
        email: 'info@tech.com',
        address: 'الرياض - حي العليا - برج الفيصلية',
        tax_number: '100123456789',
        balance: 15000,
        notes: 'مورد رئيسي للأجهزة الإلكترونية'
      },
      {
        id: 2,
        name: 'مؤسسة الإلكترونيات الحديثة',
        phone: '0126789012',
        email: 'sales@electronics.com',
        address: 'جدة - حي الروضة - شارع التحلية',
        tax_number: '100987654321',
        balance: 8500,
        notes: 'أسعار تنافسية'
      },
      {
        id: 3,
        name: 'شركة الأجهزة الذكية',
        phone: '0138901234',
        email: 'orders@smart.com',
        address: 'الدمام - حي الشاطئ - كورنيش الدمام',
        tax_number: '100456789123',
        balance: 22000,
        notes: 'توريد سريع'
      }
    ])
  }, [])

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.phone.includes(searchTerm) ||
    supplier.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const CustomersTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="البحث في العملاء..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10 w-80"
            />
          </div>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingItem(null)}>
              <Plus className="w-4 h-4 ml-2" />
              إضافة عميل جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? 'تعديل العميل' : 'إضافة عميل جديد'}
              </DialogTitle>
              <DialogDescription>
                أدخل بيانات العميل
              </DialogDescription>
            </DialogHeader>
            <CustomerForm 
              customer={editingItem} 
              onSave={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredCustomers.map((customer) => (
          <Card key={customer.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg flex items-center space-x-2 space-x-reverse">
                    <Users className="w-5 h-5" />
                    <span>{customer.name}</span>
                  </CardTitle>
                  <CardDescription className="mt-2 space-y-1">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Phone className="w-4 h-4" />
                      <span>{customer.phone}</span>
                    </div>
                    {customer.email && (
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Mail className="w-4 h-4" />
                        <span>{customer.email}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <MapPin className="w-4 h-4" />
                      <span>{customer.address}</span>
                    </div>
                  </CardDescription>
                </div>
                <div className="flex space-x-2 space-x-reverse">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedItem(customer)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingItem(customer)
                      setIsDialogOpen(true)
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedItem(customer)
                      setVoucherType('receipt')
                      setVoucherDialogOpen(true)
                    }}
                  >
                    <Receipt className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <span className="text-sm text-gray-600">الرصيد الحالي</span>
                  <p className={`font-semibold text-lg ${
                    customer.balance > 0 ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {Math.abs(customer.balance).toLocaleString()} ر.س
                    {customer.balance > 0 ? ' (مدين)' : ' (دائن)'}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">الحد الائتماني</span>
                  <p className="font-semibold">
                    {customer.credit_limit.toLocaleString()} ر.س
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">الرقم الضريبي</span>
                  <p className="font-semibold">
                    {customer.tax_number || 'غير محدد'}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">الحالة</span>
                  <Badge variant={customer.balance <= customer.credit_limit ? 'default' : 'destructive'}>
                    {customer.balance <= customer.credit_limit ? 'نشط' : 'تجاوز الحد'}
                  </Badge>
                </div>
              </div>

              {customer.notes && (
                <div className="border-t pt-4">
                  <span className="text-sm text-gray-600">ملاحظات:</span>
                  <p className="text-sm mt-1">{customer.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const SuppliersTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="البحث في الموردين..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10 w-80"
            />
          </div>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingItem(null)}>
              <Plus className="w-4 h-4 ml-2" />
              إضافة مورد جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? 'تعديل المورد' : 'إضافة مورد جديد'}
              </DialogTitle>
              <DialogDescription>
                أدخل بيانات المورد
              </DialogDescription>
            </DialogHeader>
            <SupplierForm 
              supplier={editingItem} 
              onSave={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredSuppliers.map((supplier) => (
          <Card key={supplier.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg flex items-center space-x-2 space-x-reverse">
                    <Building className="w-5 h-5" />
                    <span>{supplier.name}</span>
                  </CardTitle>
                  <CardDescription className="mt-2 space-y-1">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Phone className="w-4 h-4" />
                      <span>{supplier.phone}</span>
                    </div>
                    {supplier.email && (
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Mail className="w-4 h-4" />
                        <span>{supplier.email}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <MapPin className="w-4 h-4" />
                      <span>{supplier.address}</span>
                    </div>
                  </CardDescription>
                </div>
                <div className="flex space-x-2 space-x-reverse">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedItem(supplier)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingItem(supplier)
                      setIsDialogOpen(true)
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedItem(supplier)
                      setVoucherType('payment')
                      setVoucherDialogOpen(true)
                    }}
                  >
                    <DollarSign className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <span className="text-sm text-gray-600">الرصيد الحالي</span>
                  <p className="font-semibold text-lg text-blue-600">
                    {supplier.balance.toLocaleString()} ر.س
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">الرقم الضريبي</span>
                  <p className="font-semibold">
                    {supplier.tax_number || 'غير محدد'}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">الحالة</span>
                  <Badge variant="default">نشط</Badge>
                </div>
              </div>

              {supplier.notes && (
                <div className="border-t pt-4">
                  <span className="text-sm text-gray-600">ملاحظات:</span>
                  <p className="text-sm mt-1">{supplier.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">العملاء والموردين</h2>
        <div className="flex items-center space-x-4 space-x-reverse">
          <Badge variant="outline" className="flex items-center space-x-1 space-x-reverse">
            <Users className="w-4 h-4" />
            <span>{customers.length} عميل</span>
          </Badge>
          <Badge variant="outline" className="flex items-center space-x-1 space-x-reverse">
            <Building className="w-4 h-4" />
            <span>{suppliers.length} مورد</span>
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="customers">العملاء</TabsTrigger>
          <TabsTrigger value="suppliers">الموردين</TabsTrigger>
        </TabsList>

        <TabsContent value="customers">
          <CustomersTab />
        </TabsContent>

        <TabsContent value="suppliers">
          <SuppliersTab />
        </TabsContent>
      </Tabs>

      {/* Account Details Dialog */}
      {selectedItem && (
        <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {activeTab === 'customers' ? 'تفاصيل العميل' : 'تفاصيل المورد'}: {selectedItem.name}
              </DialogTitle>
            </DialogHeader>
            <AccountDetails item={selectedItem} type={activeTab} />
          </DialogContent>
        </Dialog>
      )}

      {/* Voucher Dialog */}
      {voucherDialogOpen && (
        <Dialog open={voucherDialogOpen} onOpenChange={setVoucherDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {voucherType === 'receipt' ? 'سند قبض' : 'سند صرف'}
              </DialogTitle>
              <DialogDescription>
                {voucherType === 'receipt' 
                  ? `إنشاء سند قبض من العميل: ${selectedItem?.name}`
                  : `إنشاء سند صرف للمورد: ${selectedItem?.name}`
                }
              </DialogDescription>
            </DialogHeader>
            <VoucherForm 
              item={selectedItem}
              type={voucherType}
              onSave={() => setVoucherDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

const CustomerForm = ({ customer, onSave }) => {
  const [formData, setFormData] = useState({
    name: customer?.name || '',
    phone: customer?.phone || '',
    email: customer?.email || '',
    address: customer?.address || '',
    tax_number: customer?.tax_number || '',
    credit_limit: customer?.credit_limit || 0,
    notes: customer?.notes || ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Saving customer:', formData)
    onSave()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">اسم العميل *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>
        <div>
          <Label htmlFor="phone">رقم الهاتف</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">البريد الإلكتروني</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>
        <div>
          <Label htmlFor="tax_number">الرقم الضريبي</Label>
          <Input
            id="tax_number"
            value={formData.tax_number}
            onChange={(e) => setFormData({...formData, tax_number: e.target.value})}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="address">العنوان</Label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => setFormData({...formData, address: e.target.value})}
        />
      </div>

      <div>
        <Label htmlFor="credit_limit">الحد الائتماني</Label>
        <Input
          id="credit_limit"
          type="number"
          step="0.01"
          value={formData.credit_limit}
          onChange={(e) => setFormData({...formData, credit_limit: parseFloat(e.target.value) || 0})}
        />
      </div>

      <div>
        <Label htmlFor="notes">ملاحظات</Label>
        <Input
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData({...formData, notes: e.target.value})}
        />
      </div>

      <div className="flex justify-end space-x-2 space-x-reverse pt-4">
        <Button type="button" variant="outline">
          إلغاء
        </Button>
        <Button type="submit">
          {customer ? 'تحديث' : 'حفظ'} العميل
        </Button>
      </div>
    </form>
  )
}

const SupplierForm = ({ supplier, onSave }) => {
  const [formData, setFormData] = useState({
    name: supplier?.name || '',
    phone: supplier?.phone || '',
    email: supplier?.email || '',
    address: supplier?.address || '',
    tax_number: supplier?.tax_number || '',
    notes: supplier?.notes || ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Saving supplier:', formData)
    onSave()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">اسم المورد *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>
        <div>
          <Label htmlFor="phone">رقم الهاتف</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">البريد الإلكتروني</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>
        <div>
          <Label htmlFor="tax_number">الرقم الضريبي</Label>
          <Input
            id="tax_number"
            value={formData.tax_number}
            onChange={(e) => setFormData({...formData, tax_number: e.target.value})}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="address">العنوان</Label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => setFormData({...formData, address: e.target.value})}
        />
      </div>

      <div>
        <Label htmlFor="notes">ملاحظات</Label>
        <Input
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData({...formData, notes: e.target.value})}
        />
      </div>

      <div className="flex justify-end space-x-2 space-x-reverse pt-4">
        <Button type="button" variant="outline">
          إلغاء
        </Button>
        <Button type="submit">
          {supplier ? 'تحديث' : 'حفظ'} المورد
        </Button>
      </div>
    </form>
  )
}

const VoucherForm = ({ item, type, onSave }) => {
  const [formData, setFormData] = useState({
    amount: 0,
    payment_method: 'Cash',
    reference_number: '',
    notes: '',
    voucher_date: new Date().toISOString().split('T')[0]
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Saving voucher:', { ...formData, type, item_id: item.id })
    onSave()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="amount">المبلغ *</Label>
          <Input
            id="amount"
            type="number"
            step="0.01"
            value={formData.amount}
            onChange={(e) => setFormData({...formData, amount: parseFloat(e.target.value) || 0})}
            required
          />
        </div>
        <div>
          <Label htmlFor="voucher_date">التاريخ</Label>
          <Input
            id="voucher_date"
            type="date"
            value={formData.voucher_date}
            onChange={(e) => setFormData({...formData, voucher_date: e.target.value})}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="payment_method">طريقة الدفع</Label>
          <select
            id="payment_method"
            value={formData.payment_method}
            onChange={(e) => setFormData({...formData, payment_method: e.target.value})}
            className="w-full p-2 border rounded-md"
          >
            <option value="Cash">نقدي</option>
            <option value="Bank">تحويل بنكي</option>
            <option value="Check">شيك</option>
          </select>
        </div>
        <div>
          <Label htmlFor="reference_number">رقم المرجع</Label>
          <Input
            id="reference_number"
            value={formData.reference_number}
            onChange={(e) => setFormData({...formData, reference_number: e.target.value})}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="notes">ملاحظات</Label>
        <Input
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData({...formData, notes: e.target.value})}
        />
      </div>

      <div className="flex justify-end space-x-2 space-x-reverse pt-4">
        <Button type="button" variant="outline">
          إلغاء
        </Button>
        <Button type="submit">
          حفظ السند
        </Button>
      </div>
    </form>
  )
}

const AccountDetails = ({ item, type }) => {
  // Sample account transactions
  const transactions = [
    {
      id: 1,
      date: '2024-09-26',
      description: type === 'customers' ? 'فاتورة مبيعات رقم 1' : 'فاتورة مشتريات رقم 1',
      debit: type === 'customers' ? 4450 : 0,
      credit: type === 'customers' ? 0 : 7150,
      balance: type === 'customers' ? 4450 : 7150
    },
    {
      id: 2,
      date: '2024-09-25',
      description: type === 'customers' ? 'سند قبض رقم 1' : 'سند صرف رقم 1',
      debit: type === 'customers' ? 0 : 2000,
      credit: type === 'customers' ? 2000 : 0,
      balance: type === 'customers' ? 2450 : 5150
    }
  ]

  return (
    <div className="space-y-6">
      {/* Account Summary */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <DollarSign className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">الرصيد الحالي</p>
                <p className="text-lg font-bold">{item.balance.toLocaleString()} ر.س</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">إجمالي المدين</p>
                <p className="text-lg font-bold">15,000 ر.س</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <TrendingDown className="w-5 h-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">إجمالي الدائن</p>
                <p className="text-lg font-bold">12,500 ر.س</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Account Statement */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>كشف الحساب</CardTitle>
            <Button variant="outline" size="sm">
              <Printer className="w-4 h-4 ml-2" />
              طباعة
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">التاريخ</TableHead>
                <TableHead className="text-right">البيان</TableHead>
                <TableHead className="text-right">مدين</TableHead>
                <TableHead className="text-right">دائن</TableHead>
                <TableHead className="text-right">الرصيد</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{new Date(transaction.date).toLocaleDateString('ar-SA')}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell className="text-red-600">
                    {transaction.debit > 0 ? transaction.debit.toLocaleString() : '-'}
                  </TableCell>
                  <TableCell className="text-green-600">
                    {transaction.credit > 0 ? transaction.credit.toLocaleString() : '-'}
                  </TableCell>
                  <TableCell className="font-medium">
                    {transaction.balance.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default CustomersSuppliers

