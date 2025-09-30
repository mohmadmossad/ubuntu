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
  ShoppingCart, 
  DollarSign, 
  Calendar,
  Building,
  Package,
  FileText,
  Printer,
  Eye,
  RefreshCw,
  TrendingUp
} from 'lucide-react'

const PurchasesManagement = () => {
  const [activeTab, setActiveTab] = useState('purchases')
  const [searchTerm, setSearchTerm] = useState('')
  const [purchases, setPurchases] = useState([])
  const [suppliers, setSuppliers] = useState([])
  const [products, setProducts] = useState([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPurchase, setEditingPurchase] = useState(null)
  const [selectedPurchase, setSelectedPurchase] = useState(null)

  // Sample data
  useEffect(() => {
    // Initialize with sample data
    setSuppliers([
      { id: 1, name: 'شركة التقنية المتقدمة', phone: '0112345678', email: 'info@tech.com', address: 'الرياض - حي العليا' },
      { id: 2, name: 'مؤسسة الإلكترونيات الحديثة', phone: '0126789012', email: 'sales@electronics.com', address: 'جدة - حي الروضة' },
      { id: 3, name: 'شركة الأجهزة الذكية', phone: '0138901234', email: 'orders@smart.com', address: 'الدمام - حي الشاطئ' }
    ])

    setProducts([
      {
        id: 1,
        name: 'آيفون 15 برو',
        barcode: '1234567890123',
        purchase_price: 3500,
        sale_price: 4200
      },
      {
        id: 2,
        name: 'لابتوب ديل XPS',
        barcode: '2345678901234',
        purchase_price: 2800,
        sale_price: 3500
      },
      {
        id: 3,
        name: 'سماعات بلوتوث',
        barcode: '3456789012345',
        purchase_price: 150,
        sale_price: 250
      }
    ])

    setPurchases([
      {
        id: 1,
        supplier_id: 1,
        purchase_date: '2024-09-26',
        total_amount: 7150,
        discount_amount: 100,
        tax_amount: 0,
        payment_type: 'Credit',
        payment_status: 'Pending',
        items: [
          { product_id: 1, quantity: 2, unit_price: 3500, total_price: 7000 },
          { product_id: 3, quantity: 1, unit_price: 150, total_price: 150 }
        ]
      },
      {
        id: 2,
        supplier_id: 2,
        purchase_date: '2024-09-25',
        total_amount: 2800,
        discount_amount: 0,
        tax_amount: 420,
        payment_type: 'Cash',
        payment_status: 'Paid',
        items: [
          { product_id: 2, quantity: 1, unit_price: 2800, total_price: 2800 }
        ]
      },
      {
        id: 3,
        supplier_id: 3,
        purchase_date: '2024-09-24',
        total_amount: 1500,
        discount_amount: 0,
        tax_amount: 225,
        payment_type: 'Cash',
        payment_status: 'Paid',
        items: [
          { product_id: 3, quantity: 10, unit_price: 150, total_price: 1500 }
        ]
      }
    ])
  }, [])

  const getSupplierName = (supplierId) => {
    const supplier = suppliers.find(s => s.id === supplierId)
    return supplier ? supplier.name : 'غير محدد'
  }

  const getProductName = (productId) => {
    const product = products.find(p => p.id === productId)
    return product ? product.name : 'غير محدد'
  }

  const filteredPurchases = purchases.filter(purchase => {
    const supplierName = getSupplierName(purchase.supplier_id)
    return supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           purchase.id.toString().includes(searchTerm)
  })

  const PurchasesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="البحث في المشتريات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10 w-80"
            />
          </div>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingPurchase(null)}>
              <Plus className="w-4 h-4 ml-2" />
              فاتورة مشتريات جديدة
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPurchase ? 'تعديل فاتورة المشتريات' : 'فاتورة مشتريات جديدة'}
              </DialogTitle>
              <DialogDescription>
                أدخل تفاصيل فاتورة المشتريات
              </DialogDescription>
            </DialogHeader>
            <PurchaseForm 
              purchase={editingPurchase} 
              suppliers={suppliers}
              products={products}
              onSave={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredPurchases.map((purchase) => (
          <Card key={purchase.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg flex items-center space-x-2 space-x-reverse">
                    <ShoppingCart className="w-5 h-5" />
                    <span>فاتورة مشتريات رقم #{purchase.id}</span>
                  </CardTitle>
                  <CardDescription className="flex items-center space-x-4 space-x-reverse mt-2">
                    <span className="flex items-center space-x-1 space-x-reverse">
                      <Building className="w-4 h-4" />
                      <span>{getSupplierName(purchase.supplier_id)}</span>
                    </span>
                    <span className="flex items-center space-x-1 space-x-reverse">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(purchase.purchase_date).toLocaleDateString('ar-SA')}</span>
                    </span>
                  </CardDescription>
                </div>
                <div className="flex space-x-2 space-x-reverse">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedPurchase(purchase)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingPurchase(purchase)
                      setIsDialogOpen(true)
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Printer className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <span className="text-sm text-gray-600">المبلغ الإجمالي</span>
                  <p className="font-semibold text-lg text-blue-600">
                    {purchase.total_amount.toLocaleString()} ر.س
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">الخصم</span>
                  <p className="font-semibold">
                    {purchase.discount_amount.toLocaleString()} ر.س
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">نوع الدفع</span>
                  <Badge variant={purchase.payment_type === 'Cash' ? 'default' : 'secondary'}>
                    {purchase.payment_type === 'Cash' ? 'نقدي' : 'آجل'}
                  </Badge>
                </div>
                <div>
                  <span className="text-sm text-gray-600">حالة الدفع</span>
                  <Badge variant={purchase.payment_status === 'Paid' ? 'default' : 'destructive'}>
                    {purchase.payment_status === 'Paid' ? 'مدفوع' : 'معلق'}
                  </Badge>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-2 flex items-center space-x-1 space-x-reverse">
                  <Package className="w-4 h-4" />
                  <span>الأصناف ({purchase.items.length})</span>
                </h4>
                <div className="space-y-2">
                  {purchase.items.map((item, index) => (
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
        <h3 className="text-lg font-semibold">مردودات المشتريات</h3>
        <Button>
          <Plus className="w-4 h-4 ml-2" />
          إضافة مردود جديد
        </Button>
      </div>

      <div className="text-center py-12">
        <RefreshCw className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">مردودات المشتريات</h3>
        <p className="text-gray-500">لا توجد مردودات مسجلة حتى الآن</p>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">إدارة المشتريات</h2>
        <div className="flex items-center space-x-4 space-x-reverse">
          <Badge variant="outline" className="flex items-center space-x-1 space-x-reverse">
            <ShoppingCart className="w-4 h-4" />
            <span>{purchases.length} فاتورة</span>
          </Badge>
          <Badge variant="outline" className="flex items-center space-x-1 space-x-reverse">
            <TrendingUp className="w-4 h-4" />
            <span>{purchases.reduce((sum, purchase) => sum + purchase.total_amount, 0).toLocaleString()} ر.س</span>
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="purchases">فواتير المشتريات</TabsTrigger>
          <TabsTrigger value="returns">المردودات</TabsTrigger>
        </TabsList>

        <TabsContent value="purchases">
          <PurchasesTab />
        </TabsContent>

        <TabsContent value="returns">
          <ReturnsTab />
        </TabsContent>
      </Tabs>

      {/* Purchase Details Dialog */}
      {selectedPurchase && (
        <Dialog open={!!selectedPurchase} onOpenChange={() => setSelectedPurchase(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>تفاصيل فاتورة المشتريات #{selectedPurchase.id}</DialogTitle>
            </DialogHeader>
            <PurchaseDetails purchase={selectedPurchase} supplier={suppliers.find(s => s.id === selectedPurchase.supplier_id)} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

const PurchaseForm = ({ purchase, suppliers, products, onSave }) => {
  const [formData, setFormData] = useState({
    supplier_id: purchase?.supplier_id || '',
    purchase_date: purchase?.purchase_date || new Date().toISOString().split('T')[0],
    payment_type: purchase?.payment_type || 'Cash',
    payment_status: purchase?.payment_status || 'Paid',
    discount_amount: purchase?.discount_amount || 0,
    tax_amount: purchase?.tax_amount || 0,
    notes: purchase?.notes || '',
    items: purchase?.items || []
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
        unit_price: product?.purchase_price || newItem.unit_price,
        total_price: newItem.quantity * (product?.purchase_price || newItem.unit_price)
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
    console.log('Saving purchase:', { ...formData, total_amount: totalAmount })
    onSave()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="supplier">المورد</Label>
          <Select value={formData.supplier_id.toString()} onValueChange={(value) => setFormData({...formData, supplier_id: parseInt(value)})}>
            <SelectTrigger>
              <SelectValue placeholder="اختر المورد" />
            </SelectTrigger>
            <SelectContent>
              {suppliers.map((supplier) => (
                <SelectItem key={supplier.id} value={supplier.id.toString()}>
                  {supplier.name} - {supplier.phone}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="purchase_date">تاريخ الشراء</Label>
          <Input
            id="purchase_date"
            type="date"
            value={formData.purchase_date}
            onChange={(e) => setFormData({...formData, purchase_date: e.target.value})}
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
                  {product.name} - {product.purchase_price} ر.س
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
          <div className="text-2xl font-bold text-blue-600 mt-2">
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
          {purchase ? 'تحديث' : 'حفظ'} الفاتورة
        </Button>
      </div>
    </form>
  )
}

const PurchaseDetails = ({ purchase, supplier }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="text-sm text-gray-600">المورد:</span>
          <p className="font-medium">{supplier ? supplier.name : 'غير محدد'}</p>
        </div>
        <div>
          <span className="text-sm text-gray-600">التاريخ:</span>
          <p className="font-medium">{new Date(purchase.purchase_date).toLocaleDateString('ar-SA')}</p>
        </div>
      </div>
      
      <div className="border-t pt-4">
        <h4 className="font-medium mb-2">تفاصيل الفاتورة</h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>المبلغ الإجمالي:</span>
            <span className="font-medium">{purchase.total_amount.toLocaleString()} ر.س</span>
          </div>
          <div className="flex justify-between">
            <span>الخصم:</span>
            <span className="font-medium">{purchase.discount_amount.toLocaleString()} ر.س</span>
          </div>
          <div className="flex justify-between">
            <span>الضريبة:</span>
            <span className="font-medium">{purchase.tax_amount.toLocaleString()} ر.س</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PurchasesManagement

