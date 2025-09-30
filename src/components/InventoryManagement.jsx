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
  Package, 
  Warehouse, 
  Tags, 
  Ruler,
  Barcode,
  TrendingUp,
  TrendingDown,
  AlertTriangle
} from 'lucide-react'

const InventoryManagement = () => {
  const [activeTab, setActiveTab] = useState('products')
  const [searchTerm, setSearchTerm] = useState('')
  const [products, setProducts] = useState([])
  const [warehouses, setWarehouses] = useState([])
  const [categories, setCategories] = useState([])
  const [units, setUnits] = useState([])
  const [inventory, setInventory] = useState([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)

  // Sample data
  useEffect(() => {
    // Initialize with sample data
    setWarehouses([
      { id: 1, name: 'المخزن الرئيسي', location: 'الرياض - حي النخيل' },
      { id: 2, name: 'مخزن الفرع الثاني', location: 'جدة - حي الصفا' }
    ])

    setCategories([
      { id: 1, name: 'إلكترونيات', parent_id: null },
      { id: 2, name: 'هواتف ذكية', parent_id: 1 },
      { id: 3, name: 'أجهزة كمبيوتر', parent_id: 1 },
      { id: 4, name: 'ملابس', parent_id: null },
      { id: 5, name: 'ملابس رجالية', parent_id: 4 }
    ])

    setUnits([
      { id: 1, name: 'قطعة', conversion_factor: 1 },
      { id: 2, name: 'كرتون', conversion_factor: 12 },
      { id: 3, name: 'درزن', conversion_factor: 12 },
      { id: 4, name: 'كيلو', conversion_factor: 1 }
    ])

    setProducts([
      {
        id: 1,
        name: 'آيفون 15 برو',
        description: 'هاتف ذكي من آبل',
        barcode: '1234567890123',
        purchase_price: 3500,
        sale_price: 4200,
        category_id: 2,
        base_unit_id: 1,
        reorder_level: 5
      },
      {
        id: 2,
        name: 'لابتوب ديل XPS',
        description: 'جهاز كمبيوتر محمول',
        barcode: '2345678901234',
        purchase_price: 2800,
        sale_price: 3500,
        category_id: 3,
        base_unit_id: 1,
        reorder_level: 3
      }
    ])

    setInventory([
      { id: 1, product_id: 1, warehouse_id: 1, quantity: 15 },
      { id: 2, product_id: 1, warehouse_id: 2, quantity: 8 },
      { id: 3, product_id: 2, warehouse_id: 1, quantity: 5 },
      { id: 4, product_id: 2, warehouse_id: 2, quantity: 2 }
    ])
  }, [])

  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id === categoryId)
    return category ? category.name : 'غير محدد'
  }

  const getUnitName = (unitId) => {
    const unit = units.find(u => u.id === unitId)
    return unit ? unit.name : 'غير محدد'
  }

  const getWarehouseName = (warehouseId) => {
    const warehouse = warehouses.find(w => w.id === warehouseId)
    return warehouse ? warehouse.name : 'غير محدد'
  }

  const getProductInventory = (productId) => {
    return inventory.filter(inv => inv.product_id === productId)
  }

  const getTotalQuantity = (productId) => {
    return inventory
      .filter(inv => inv.product_id === productId)
      .reduce((total, inv) => total + inv.quantity, 0)
  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.barcode.includes(searchTerm)
  )

  const ProductsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="البحث في الأصناف..."
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
              إضافة صنف جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? 'تعديل الصنف' : 'إضافة صنف جديد'}
              </DialogTitle>
              <DialogDescription>
                أدخل تفاصيل الصنف
              </DialogDescription>
            </DialogHeader>
            <ProductForm 
              product={editingItem} 
              categories={categories}
              units={units}
              onSave={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => {
          const totalQty = getTotalQuantity(product.id)
          const isLowStock = totalQty <= product.reorder_level
          
          return (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                  </div>
                  <div className="flex space-x-2 space-x-reverse">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingItem(product)
                        setIsDialogOpen(true)
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">الباركود:</span>
                  <Badge variant="outline" className="font-mono">
                    {product.barcode}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">الفئة:</span>
                  <Badge variant="secondary">
                    {getCategoryName(product.category_id)}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">الوحدة:</span>
                  <span className="text-sm">{getUnitName(product.base_unit_id)}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <span className="text-xs text-gray-500">سعر الشراء</span>
                    <p className="font-semibold text-blue-600">
                      {product.purchase_price.toLocaleString()} ر.س
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">سعر البيع</span>
                    <p className="font-semibold text-green-600">
                      {product.sale_price.toLocaleString()} ر.س
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-sm text-gray-600">الكمية المتاحة:</span>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Badge 
                      variant={isLowStock ? "destructive" : "default"}
                      className="flex items-center space-x-1 space-x-reverse"
                    >
                      {isLowStock && <AlertTriangle className="w-3 h-3" />}
                      <span>{totalQty}</span>
                    </Badge>
                  </div>
                </div>

                {isLowStock && (
                  <div className="text-xs text-red-600 bg-red-50 p-2 rounded">
                    تحذير: الكمية أقل من حد إعادة الطلب ({product.reorder_level})
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )

  const WarehousesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">إدارة المخازن</h3>
        <Button>
          <Plus className="w-4 h-4 ml-2" />
          إضافة مخزن جديد
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {warehouses.map((warehouse) => (
          <Card key={warehouse.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 space-x-reverse">
                <Warehouse className="w-5 h-5" />
                <span>{warehouse.name}</span>
              </CardTitle>
              <CardDescription>{warehouse.location}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">عدد الأصناف:</span>
                <Badge variant="outline">
                  {inventory.filter(inv => inv.warehouse_id === warehouse.id).length}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const CategoriesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">إدارة الفئات</h3>
        <Button>
          <Plus className="w-4 h-4 ml-2" />
          إضافة فئة جديدة
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-right">اسم الفئة</TableHead>
            <TableHead className="text-right">الفئة الأم</TableHead>
            <TableHead className="text-right">عدد الأصناف</TableHead>
            <TableHead className="text-right">الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell>
                {category.parent_id ? getCategoryName(category.parent_id) : 'فئة رئيسية'}
              </TableCell>
              <TableCell>
                <Badge variant="outline">
                  {products.filter(p => p.category_id === category.id).length}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2 space-x-reverse">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">المخازن والأصناف</h2>
        <div className="flex items-center space-x-4 space-x-reverse">
          <Badge variant="outline" className="flex items-center space-x-1 space-x-reverse">
            <Package className="w-4 h-4" />
            <span>{products.length} صنف</span>
          </Badge>
          <Badge variant="outline" className="flex items-center space-x-1 space-x-reverse">
            <Warehouse className="w-4 h-4" />
            <span>{warehouses.length} مخزن</span>
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="products">الأصناف</TabsTrigger>
          <TabsTrigger value="warehouses">المخازن</TabsTrigger>
          <TabsTrigger value="categories">الفئات</TabsTrigger>
          <TabsTrigger value="units">الوحدات</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <ProductsTab />
        </TabsContent>

        <TabsContent value="warehouses">
          <WarehousesTab />
        </TabsContent>

        <TabsContent value="categories">
          <CategoriesTab />
        </TabsContent>

        <TabsContent value="units">
          <div className="text-center py-12">
            <Ruler className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">إدارة الوحدات</h3>
            <p className="text-gray-500">سيتم إضافة هذه الوحدة قريباً</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const ProductForm = ({ product, categories, units, onSave }) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    barcode: product?.barcode || '',
    purchase_price: product?.purchase_price || 0,
    sale_price: product?.sale_price || 0,
    category_id: product?.category_id || '',
    base_unit_id: product?.base_unit_id || '',
    reorder_level: product?.reorder_level || 0
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically make an API call
    console.log('Saving product:', formData)
    onSave()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">اسم الصنف</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>
        <div>
          <Label htmlFor="barcode">الباركود</Label>
          <Input
            id="barcode"
            value={formData.barcode}
            onChange={(e) => setFormData({...formData, barcode: e.target.value})}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">الوصف</Label>
        <Input
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="category">الفئة</Label>
          <Select value={formData.category_id.toString()} onValueChange={(value) => setFormData({...formData, category_id: parseInt(value)})}>
            <SelectTrigger>
              <SelectValue placeholder="اختر الفئة" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="unit">الوحدة</Label>
          <Select value={formData.base_unit_id.toString()} onValueChange={(value) => setFormData({...formData, base_unit_id: parseInt(value)})}>
            <SelectTrigger>
              <SelectValue placeholder="اختر الوحدة" />
            </SelectTrigger>
            <SelectContent>
              {units.map((unit) => (
                <SelectItem key={unit.id} value={unit.id.toString()}>
                  {unit.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="purchase_price">سعر الشراء</Label>
          <Input
            id="purchase_price"
            type="number"
            step="0.01"
            value={formData.purchase_price}
            onChange={(e) => setFormData({...formData, purchase_price: parseFloat(e.target.value)})}
          />
        </div>
        <div>
          <Label htmlFor="sale_price">سعر البيع</Label>
          <Input
            id="sale_price"
            type="number"
            step="0.01"
            value={formData.sale_price}
            onChange={(e) => setFormData({...formData, sale_price: parseFloat(e.target.value)})}
          />
        </div>
        <div>
          <Label htmlFor="reorder_level">حد إعادة الطلب</Label>
          <Input
            id="reorder_level"
            type="number"
            value={formData.reorder_level}
            onChange={(e) => setFormData({...formData, reorder_level: parseInt(e.target.value)})}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2 space-x-reverse pt-4">
        <Button type="button" variant="outline">
          إلغاء
        </Button>
        <Button type="submit">
          {product ? 'تحديث' : 'إضافة'}
        </Button>
      </div>
    </form>
  )
}

export default InventoryManagement

