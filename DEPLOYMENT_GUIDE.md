# دليل نشر نظام المحاسبة الشامل

## نظرة عامة

هذا المشروع هو نظام محاسبة شامل يتكون من:
- **الواجهة الخلفية (Backend):** Flask + Python
- **الواجهة الأمامية (Frontend):** React + Vite + Tailwind CSS + shadcn/ui
- **قاعدة البيانات:** SQLite (للتطوير) / PostgreSQL (للإنتاج)

## خيارات النشر المجانية

### الخيار الأول: النشر المتكامل على Render

#### 1. إعداد قاعدة البيانات
1. اذهب إلى [Render.com](https://render.com) وأنشئ حساب
2. انقر على "New +" واختر "PostgreSQL"
3. اختر الخطة المجانية (Free)
4. احفظ رابط قاعدة البيانات (Database URL)

#### 2. نشر التطبيق
1. ارفع الكود إلى GitHub repository
2. في Render، انقر على "New +" واختر "Web Service"
3. اربط حساب GitHub واختر المستودع
4. استخدم الإعدادات التالية:
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `gunicorn main:app`
   - **Environment Variables:**
     - `DATABASE_URL`: [رابط قاعدة البيانات من الخطوة 1]
     - `SECRET_KEY`: [مفتاح سري قوي]
     - `JWT_SECRET_KEY`: [مفتاح JWT سري]
     - `FLASK_ENV`: `production`

### الخيار الثاني: النشر المنفصل

#### للواجهة الأمامية - Netlify
1. ارفع مجلد `dist` إلى GitHub repository منفصل
2. اذهب إلى [Netlify.com](https://netlify.com)
3. انقر على "New site from Git"
4. اختر المستودع واتركه ينشر تلقائياً

#### للواجهة الخلفية - Render
1. اتبع نفس خطوات الخيار الأول
2. أضف متغير البيئة `CORS_ORIGINS` مع رابط Netlify

### الخيار الثالث: Heroku (إذا كان متاحاً)

#### 1. تثبيت Heroku CLI
```bash
# على Ubuntu/Debian
curl https://cli-assets.heroku.com/install.sh | sh
```

#### 2. تسجيل الدخول ونشر التطبيق
```bash
heroku login
heroku create your-app-name
heroku addons:create heroku-postgresql:hobby-dev
git add .
git commit -m "Initial deployment"
git push heroku main
```

## متطلبات النظام

### Python Dependencies
```
Flask==2.3.3
Flask-CORS==4.0.0
Flask-JWT-Extended==4.5.3
Flask-SQLAlchemy==3.0.5
Flask-Migrate==4.0.5
SQLAlchemy==2.0.23
psycopg2-binary==2.9.7
python-dotenv==1.0.0
gunicorn==21.2.0
```

### Node.js Dependencies
```
react@^18.2.0
react-dom@^18.2.0
vite@^4.4.5
tailwindcss
@radix-ui/react-*
lucide-react
recharts
```

## المتغيرات البيئية المطلوبة

```env
DATABASE_URL=postgresql://username:password@host:port/database
SECRET_KEY=your-secret-key-here
JWT_SECRET_KEY=your-jwt-secret-key-here
FLASK_ENV=production
DEBUG=False
PORT=5000
```

## هيكل المشروع

```
accounting_app/
├── src/
│   ├── components/
│   │   ├── ui/           # مكونات UI
│   │   └── *.jsx         # مكونات React
│   ├── models/           # نماذج قاعدة البيانات
│   ├── routes/           # مسارات API
│   └── lib/              # مكتبات مساعدة
├── static/               # ملفات الواجهة الأمامية المبنية
├── database/             # ملفات قاعدة البيانات المحلية
├── main.py               # ملف Flask الرئيسي
├── requirements.txt      # تبعيات Python
├── package.json          # تبعيات Node.js
├── Procfile             # إعدادات Heroku
├── runtime.txt          # إصدار Python
└── .env.example         # مثال على المتغيرات البيئية
```

## خطوات ما بعد النشر

1. **إنشاء حساب المدير الأول:**
   - استخدم API endpoint `/api/register` لإنشاء أول مستخدم
   - أو أضف مستخدم مباشرة في قاعدة البيانات

2. **تكوين الإعدادات:**
   - قم بتسجيل الدخول وإعداد بيانات الشركة
   - أضف الحسابات المحاسبية الأساسية
   - أنشئ المستخدمين وحدد صلاحياتهم

3. **النسخ الاحتياطي:**
   - قم بإعداد نسخ احتياطية دورية لقاعدة البيانات
   - احفظ نسخة من ملفات التكوين

## استكشاف الأخطاء

### مشاكل شائعة:
1. **خطأ في الاتصال بقاعدة البيانات:** تأكد من صحة `DATABASE_URL`
2. **مشاكل CORS:** تأكد من إعداد `CORS_ORIGINS` بشكل صحيح
3. **ملفات مفقودة:** تأكد من رفع جميع الملفات المطلوبة

### سجلات الأخطاء:
- في Render: اذهب إلى Dashboard > Logs
- في Heroku: استخدم `heroku logs --tail`

## الدعم والصيانة

- راجع سجلات الأخطاء بانتظام
- حدث التبعيات الأمنية
- راقب استخدام الموارد في الخطط المجانية
- قم بعمل نسخ احتياطية دورية

## ملاحظات مهمة

- الخطط المجانية لها قيود على الموارد والوقت
- قد تحتاج إلى ترقية للخطط المدفوعة للاستخدام المكثف
- تأكد من حماية المتغيرات البيئية الحساسة
- استخدم HTTPS دائماً في الإنتاج
