import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Receipt, 
  DollarSign, 
  Calendar,
  User,
  Package,
  FileText,
  Printer,
  Share,
  Eye,
  RefreshCw
} from 'lucide-react'

const SalesManagement = () => {
  const [activeTab, setActiveTab] = useState('sales')
  const [searchTerm, setSearchTerm] = useState('')
  const [sales, setSales] = useState([])
  const [customers, setCustomers] = useState([])
  const [products, setProducts] = useState([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingSale, setEditingSale] = useState(null)
  const [selectedSale, setSelectedSale] = useState(null)

  // Sample data
  useEffect(() => {
    // Initialize with sample data
    setCustomers([
      { id: 1, name: 'أحمد محمد', phone: '0501234567', email: 'ahmed@example.com', address: 'الرياض - حي النخيل' },
      { id: 2, name: 'فاطمة علي', phone: '0507654321', email: 'fatima@example.com', address: 'جدة - حي الصفا' },
      { id: 3, name: 'محمد سالم', phone: '0509876543', email: 'mohammed@example.com', address: 'الدمام - حي الفيصلية' }
    ])

    setProducts([
      {
        id: 1,
        name: 'آيفون 15 برو',
        barcode: '1234567890123',
        sale_price: 4200,
        inventory: [{ warehouse_id: 1, quantity: 15 }]
      },
      {
        id: 2,
        name: 'لابتوب ديل XPS',
        barcode: '2345678901234',
        sale_price: 3500,
        inventory: [{ warehouse_id: 1, quantity: 5 }]
      },
      {
        id: 3,
        name: 'سماعات بلوتوث',
        barcode: '3456789012345',
        sale_price: 250,
        inventory: [{ warehouse_id: 1, quantity: 30 }]
      }
    ])

    setSales([
      {
        id: 1,
        customer_id: 1,
        sale_date: '2024-09-26',
        total_amount: 4450,
        discount_amount: 50,
        tax_amount: 0,
        payment_type: 'Cash',
        payment_status: 'Paid',
        items: [
          { product_id: 1, quantity: 1, unit_price: 4200, total_price: 4200 },
          { product_id: 3, quantity: 1, unit_price: 250, total_price: 250 }
        ]
      },
      {
        id: 2,
        customer_id: 2,
        sale_date: '2024-09-25',
        total_amount: 3500,
        discount_amount: 0,
        tax_amount: 525,
        payment_type: 'Credit',
        payment_status: 'Pending',
        items: [
          { product_id: 2, quantity: 1, unit_price: 3500, total_price: 3500 }
        ]
      },
      {
        id: 3,
        customer_id: null,
        sale_date: '2024-09-24',
        total_amount: 500,
        discount_amount: 0,
        tax_amount: 75,
        payment_type: 'Cash',
        payment_status: 'Paid',
        items: [
          { product_id: 3, quantity: 2, unit_price: 250, total_price: 500 }
        ]
      }
    ])
  }, [])

  const getCustomerName = (customerId) => {
    if (!customerId) return 'عميل نقدي'
    const customer = customers.find(c => c.id === customerId)
    return customer ? customer.name : 'غير محدد'
  }

  const getProductName = (productId) => {
    const product = products.find(p => p.id === productId)
    return product ? product.name : 'غير محدد'
  }

  const filteredSales = sales.filter(sale => {
    const customerName = getCustomerName(sale.customer_id)
    return customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           sale.id.toString().includes(searchTerm)
  })

  const SalesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="البحث في المبيعات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10 w-80"
            />
          </div>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingSale(null)}>
              <Plus className="w-4 h-4 ml-2" />
              فاتورة مبيعات جديدة
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingSale ? 'تعديل فاتورة المبيعات' : 'فاتورة مبيعات جديدة'}
              </DialogTitle>
              <DialogDescription>
                أدخل تفاصيل فاتورة المبيعات
              </DialogDescription>
            </DialogHeader>
            <SaleForm 
              sale={editingSale} 
              customers={customers}
              products={products}
              onSave={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredSales.map((sale) => (
          <Card key={sale.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg flex items-center space-x-2 space-x-reverse">
                    <Receipt className="w-5 h-5" />
                    <span>فاتورة رقم #{sale.id}</span>
                  </CardTitle>
                  <CardDescription className="flex items-center space-x-4 space-x-reverse mt-2">
                    <span className="flex items-center space-x-1 space-x-reverse">
                      <User className="w-4 h-4" />
                      <span>{getCustomerName(sale.customer_id)}</span>
                    </span>
                    <span className="flex items-center space-x-1 space-x-reverse">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(sale.sale_date).toLocaleDateString('ar-SA')}</span>
                    </span>
                  </CardDescription>
                </div>
                <div className="flex space-x-2 space-x-reverse">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedSale(sale)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingSale(sale)
                      setIsDialogOpen(true)
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Printer className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-green-600">
                    <Share className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <span className="text-sm text-gray-600">المبلغ الإجمالي</span>
                  <p className="font-semibold text-lg text-green-600">
                    {sale.total_amount.toLocaleString()} ر.س
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">الخصم</span>
                  <p className="font-semibold">
                    {sale.discount_amount.toLocaleString()} ر.س
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">نوع الدفع</span>
                  <Badge variant={sale.payment_type === 'Cash' ? 'default' : 'secondary'}>
                    {sale.payment_type === 'Cash' ? 'نقدي' : 'آجل'}
                  </Badge>
                </div>
                <div>
                  <span className="text-sm text-gray-600">حالة الدفع</span>
                  <Badge variant={sale.payment_status === 'Paid' ? 'default' : 'destructive'}>
                    {sale.payment_status === 'Paid' ? 'مدفوع' : 'معلق'}
                  </Badge>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-2 flex items-center space-x-1 space-x-reverse">
                  <Package className="w-4 h-4" />
                  <span>الأصناف ({sale.items.length})</span>
                </h4>
                <div className="space-y-2">
                  {sale.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center text-sm bg-gray-50 p-2 rounded">
                      <span>{getProductName(item.product_id)}</span>
                      <span>{item.quantity} × {item.unit_price.toLocaleString()} = {item.total_price.toLocaleString()} ر.س</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const ReturnsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">مردودات المبيعات</h3>
        <Button>
          <Plus className="w-4 h-4 ml-2" />
          إضافة مردود جديد
        </Button>
      </div>

      <div className="text-center py-12">
        <RefreshCw className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">مردودات المبيعات</h3>
        <p className="text-gray-500">لا توجد مردودات مسجلة حتى الآن</p>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">إدارة المبيعات</h2>
        <div className="flex items-center space-x-4 space-x-reverse">
          <Badge variant="outline" className="flex items-center space-x-1 space-x-reverse">
            <Receipt className="w-4 h-4" />
            <span>{sales.length} فاتورة</span>
          </Badge>
          <Badge variant="outline" className="flex items-center space-x-1 space-x-reverse">
            <DollarSign className="w-4 h-4" />
            <span>{sales.reduce((sum, sale) => sum + sale.total_amount, 0).toLocaleString()} ر.س</span>
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sales">فواتير المبيعات</TabsTrigger>
          <TabsTrigger value="returns">المردودات</TabsTrigger>
        </TabsList>

        <TabsContent value="sales">
          <SalesTab />
        </TabsContent>

        <TabsContent value="returns">
          <ReturnsTab />
        </TabsContent>
      </Tabs>

      {/* Sale Details Dialog */}
      {selectedSale && (
        <Dialog open={!!selectedSale} onOpenChange={() => setSelectedSale(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>تفاصيل فاتورة المبيعات #{selectedSale.id}</DialogTitle>
            </DialogHeader>
            <SaleDetails sale={selectedSale} customer={customers.find(c => c.id === selectedSale.customer_id)} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

const SaleForm = ({ sale, customers, products, onSave }) => {
  const [formData, setFormData] = useState({
    customer_id: sale?.customer_id || '',
    sale_date: sale?.sale_date || new Date().toISOString().split('T')[0],
    payment_type: sale?.payment_type || 'Cash',
    payment_status: sale?.payment_status || 'Paid',
    discount_amount: sale?.discount_amount || 0,
    tax_amount: sale?.tax_amount || 0,
    notes: sale?.notes || '',
    items: sale?.items || []
  })

  const [newItem, setNewItem] = useState({
    product_id: '',
    quantity: 1,
    unit_price: 0
  })

  const addItem = () => {
    if (newItem.product_id) {
      const product = products.find(p => p.id === parseInt(newItem.product_id))
      const item = {
        ...newItem,
        product_id: parseInt(newItem.product_id),
        unit_price: product?.sale_price || newItem.unit_price,
        total_price: newItem.quantity * (product?.sale_price || newItem.unit_price)
      }
      setFormData({
        ...formData,
        items: [...formData.items, item]
      })
      setNewItem({ product_id: '', quantity: 1, unit_price: 0 })
    }
  }

  const removeItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index)
    setFormData({ ...formData, items: newItems })
  }

  const totalAmount = formData.items.reduce((sum, item) => sum + item.total_price, 0) - formData.discount_amount + formData.tax_amount

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Saving sale:', { ...formData, total_amount: totalAmount })
    onSave()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="customer">العميل</Label>
          <Select value={formData.customer_id.toString()} onValueChange={(value) => setFormData({...formData, customer_id: value ? parseInt(value) : null})}>
            <SelectTrigger>
              <SelectValue placeholder="اختر العميل أو اتركه فارغاً للبيع النقدي" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">عميل نقدي</SelectItem>
              {customers.map((customer) => (
                <SelectItem key={customer.id} value={customer.id.toString()}>
                  {customer.name} - {customer.phone}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="sale_date">تاريخ البيع</Label>
          <Input
            id="sale_date"
            type="date"
            value={formData.sale_date}
            onChange={(e) => setFormData({...formData, sale_date: e.target.value})}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="payment_type">نوع الدفع</Label>
          <Select value={formData.payment_type} onValueChange={(value) => setFormData({...formData, payment_type: value})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Cash">نقدي</SelectItem>
              <SelectItem value="Credit">آجل</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="payment_status">حالة الدفع</Label>
          <Select value={formData.payment_status} onValueChange={(value) => setFormData({...formData, payment_status: value})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Paid">مدفوع</SelectItem>
              <SelectItem value="Pending">معلق</SelectItem>
              <SelectItem value="Partial">دفع جزئي</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Items Section */}
      <div className="space-y-4">
        <h4 className="font-medium">الأصناف</h4>
        
        {/* Add Item */}
        <div className="grid grid-cols-4 gap-2 p-4 border rounded-lg bg-gray-50">
          <Select value={newItem.product_id.toString()} onValueChange={(value) => setNewItem({...newItem, product_id: value})}>
            <SelectTrigger>
              <SelectValue placeholder="اختر الصنف" />
            </SelectTrigger>
            <SelectContent>
              {products.map((product) => (
                <SelectItem key={product.id} value={product.id.toString()}>
                  {product.name} - {product.sale_price} ر.س
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="number"
            placeholder="الكمية"
            value={newItem.quantity}
            onChange={(e) => setNewItem({...newItem, quantity: parseInt(e.target.value) || 1})}
            min="1"
          />
          <Input
            type="number"
            placeholder="السعر"
            value={newItem.unit_price}
            onChange={(e) => setNewItem({...newItem, unit_price: parseFloat(e.target.value) || 0})}
            step="0.01"
          />
          <Button type="button" onClick={addItem}>إضافة</Button>
        </div>

        {/* Items List */}
        {formData.items.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">الصنف</TableHead>
                <TableHead className="text-right">الكمية</TableHead>
                <TableHead className="text-right">السعر</TableHead>
                <TableHead className="text-right">الإجمالي</TableHead>
                <TableHead className="text-right">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {formData.items.map((item, index) => {
                const product = products.find(p => p.id === item.product_id)
                return (
                  <TableRow key={index}>
                    <TableCell>{product?.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.unit_price.toLocaleString()} ر.س</TableCell>
                    <TableCell>{item.total_price.toLocaleString()} ر.س</TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeItem(index)}
                        className="text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="discount_amount">الخصم</Label>
          <Input
            id="discount_amount"
            type="number"
            step="0.01"
            value={formData.discount_amount}
            onChange={(e) => setFormData({...formData, discount_amount: parseFloat(e.target.value) || 0})}
          />
        </div>
        <div>
          <Label htmlFor="tax_amount">الضريبة</Label>
          <Input
            id="tax_amount"
            type="number"
            step="0.01"
            value={formData.tax_amount}
            onChange={(e) => setFormData({...formData, tax_amount: parseFloat(e.target.value) || 0})}
          />
        </div>
        <div>
          <Label>المبلغ الإجمالي</Label>
          <div className="text-2xl font-bold text-green-600 mt-2">
            {totalAmount.toLocaleString()} ر.س
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="notes">ملاحظات</Label>
        <Input
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData({...formData, notes: e.target.value})}
          placeholder="ملاحظات إضافية..."
        />
      </div>

      <div className="flex justify-end space-x-2 space-x-reverse pt-4">
        <Button type="button" variant="outline">
          إلغاء
        </Button>
        <Button type="submit">
          {sale ? 'تحديث' : 'حفظ'} الفاتورة
        </Button>
      </div>
    </form>
  )
}

const SaleDetails = ({ sale, customer }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="text-sm text-gray-600">العميل:</span>
          <p className="font-medium">{customer ? customer.name : 'عميل نقدي'}</p>
        </div>
        <div>
          <span className="text-sm text-gray-600">التاريخ:</span>
          <p className="font-medium">{new Date(sale.sale_date).toLocaleDateString('ar-SA')}</p>
        </div>
      </div>
      
      <div className="border-t pt-4">
        <h4 className="font-medium mb-2">تفاصيل الفاتورة</h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>المبلغ الإجمالي:</span>
            <span className="font-medium">{sale.total_amount.toLocaleString()} ر.س</span>
          </div>
          <div className="flex justify-between">
            <span>الخصم:</span>
            <span className="font-medium">{sale.discount_amount.toLocaleString()} ر.س</span>
          </div>
          <div className="flex justify-between">
            <span>الضريبة:</span>
            <span className="font-medium">{sale.tax_amount.toLocaleString()} ر.س</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SalesManagement

