cd ~/flutter_setup
chmod +x install.sh
./install.sh
pacman -Syu --noconfirm
pacman -S git curl unzip xz zip base-devel --noconfirm
git clone https://github.com/flutter/flutter.git -b stable ~/flutter
export PATH="$HOME/flutter/bin:$PATH"
flutter doctor
✓ Flutter: is fully installed
✗ Android toolchain: missing
✗ Chrome: not available
flutter create perfume_erp
cd perfume_erp
flutter pub get
flutter build apk --release
cd perfume_erp/lib
nano main.dart
mkdir -p screens
nano screens/dashboard_screen.dart
nano lib/screens/inventory_screen.dart
mkdir -p lib/screens
ls lib/screens
inventory_screen.dart
nano lib/screens/inventory_screen.dart
flutter run
pacman -Syu git --noconfirm
proot-distro login archlinux
cd ~/rawah_erp
git init
git add .
git commit -m "الإصدار الأول من روعة ERP"
git branch -M main
git remote add origin https://github.com/USERNAME/rawah-erp.git
git branch -M main
git remote add origin https://github.com/mohmadmossad/ra
cd ~/rawah_erp
# تهيئة Git داخل المشروع
git init
# ضبط اسم المستخدم والبريد في Git
git config --global user.name "mohmadmossad"
git config --global user.email "mohmadmossad@gmail.com"
# إضافة جميع الملفات
git add .
# أول حفظ (Commit)
git commit -m "الإصدار الأول من روعة ERP"
# ربط المشروع بالمستودع على GitHub
git branch -M main
git remote add origin https://github.com/mohmadmossad/rawah-erp.git
# رفع المشروع
git push -u origin main
cd ~/rawah_erp
# تهيئة Git داخل المشروع
git init
# ضبط اسم المستخدم والبريد في Git
git config --global user.name "mohmadmossad"
git config --global user.email "mohmadmossad@gmail.com"
# إضافة جميع الملفات
git add .
# أول حفظ (Commit)
git commit -m "الإصدار الأول من روعة ERP"
# ربط المشروع بالمستودع على GitHub
git branch -M main
git remote add origin https://github.com/mohmadmossad/rawah-erp.git
# رفع المشروع
git push -u origin main
rawah-erp
cd ~/rawah_erp
# إذا لم تهيئ Git من قبل
git init
# ضبط اسم المستخدم والبريد
git config --global user.name "mohmadmossad"
git config --global user.email "mohmadmossad@gmail.com"
# إضافة الملفات
git add .
# أول حفظ
git commit -m "الإصدار الأول من روعة ERP"
# ربط المستودع الجديد
git branch -M main
git remote add origin https://github.com/mohmadmossad/rawah-erp.git
# رفع المشروع
git push -u origin main
cd ~/rawah_erp
# إذا لم تهيئ Git من قبل
git init
# ضبط اسم المستخدم والبريد
git config --global user.name "mohmadmossad"
git config --global user.email "mohmadmossad@gmail.com"
# إضافة الملفات
git add .
# أول حفظ
git commit -m "الإصدار الأول من روعة ERP"
# ربط المستودع الجديد
git branch -M main
git remote add origin https://github.com/mohmadmossad/rawah-erp.git
# رفع المشروع
git push -u origin main
cd ~/rawah_erp
# إذا لم تهيئ Git من قبل
git init
# ضبط اسم المستخدم والبريد
git config --global user.name "mohmadmossad"
git config --global user.email "mohmadmossad@gmail.com"
# إضافة الملفات
git add .
# أول حفظ
git commit -m "الإصدار الأول من روعة ERP"
# ربط المستودع الجديد (لاحظ أن الرابط الآن باسمك الصحيح)
git branch -M main
git remote add origin https://github.com/mohmadmossad/rawah-erp.git
# رفع المشروع
git push -u origin main
cd ~/rawah_erp
# تهيئة Git (إذا لم تكن مهيأ من قبل)
git init
# ضبط اسم المستخدم والبريد
git config --global user.name "mohmadmossad"
git config --global user.email "mohmadmossad@gmail.com"
# إضافة جميع الملفات
git add .
# أول حفظ (Commit)
git commit -m "الإصدار الأول من روعة ERP"
# ربط المستودع الجديد على GitHub
git branch -M main
git remote add origin https://github.com/mohmadmossad/rawah-erp.git
# رفع المشروع
git push -u origin main
cd ~/rawah_erp
# إزالة أي رابط قديم فيه USERNAME
git remote remove origin
# إضافة الرابط الصحيح باسمك
git remote add origin https://github.com/mohmadmossad/rawah-erp.git
# رفع المشروع
git push -u origin main
cd ~/rawah_erp
git remote remove origin
git remote add origin https://github.com/mohmadmossad/rawah-erp.git
git branch -M main
git add .
git commit -m "الإصدار الأول من روعة ERP"
git push -u origin main
https://github.com/mohmadmossad/rawah-erp
cd ~/rawah_erp
git status
cd ~/rawah_erp
git ls-files
cd ~/rawah_erp
mv assets/* .
mv assets/.* . 2>/dev/null
rmdir assets
rm -rf .git
git init
git config --global user.name "mohmadmossad"
git config --global user.email "mohmadmossad@gmail.com"
git add .
git commit -m "إعادة رفع المشروع بالهيكل الصحيح"
git branch -M main
git remote add origin https://github.com/mohmadmossad/rawah-erp.git
git push -u origin main
git push origin main --force
pwd
ls -R
cd /path/to/your/project
git init
https://github.com/mohmadmossad/REPO.git
cd /path/to/your/project
# 1. تهيئة المستودع (مرة واحدة فقط)
git init
# 2. ربطه بالمستودع على GitHub
git remote add origin https://github.com/mohmadmossad/rawah-erp.git
# 3. إضافة كل الملفات
git add .
# 4. عمل Commit
git commit -m "Initial commit - Rawah ERP"
# 5. تحديد الفرع الرئيسي ورفع الملفات
git branch -M main
git push -u origin main
git remote -v
git push -u origin main
nano codemagic.yaml
git add codemagic.yaml
git commit -m "Add Codemagic workflow"
git push
nano pubspec.yaml
flutter pub get
git add pubspec.yaml
git commit -m "Fix SDK constraint and asset config"
git push
flutter pub run flutter_launcher_icons:main
nano AndroidManifest.xml
flutter pub run flutter_launcher_icons:main
mkdir -p lib
nano lib/main.dart
git add lib/main.dart
git commit -m "Add main.dart entry point"
git push
git add lib/main.dart
git commit -m "Add main.dart entry point"
git push
mkdir -p rawah_erp/lib
nano rawah_erp/lib/main.dart
cd rawah_erp
git add lib/main.dart
git commit -m "Add main.dart entry point"
git push --set-upstream origin main
flutter create -t app rawah_erp_clean
cp -r rawah_erp/assets rawah_erp_clean/
cp rawah_erp/pubspec.yaml rawah_erp_clean/
cp -r rawah_erp/lib rawah_erp_clean/
cp rawah_erp/codemagic.yaml rawah_erp_clean/
cd rawah_erp_clean
flutter pub get
flutter run
git init
git remote add origin https://github.com/mohmadmossad/rawah-erp.git
git add .
git commit -m "Rebuild project with correct Gradle structure"
git push -f origin main
git add README.md
git commit -m "Add README file"
git push
cd rawah_erp_clean
flutter pub get
flutter run
cd ~/rawah_erp_clean
flutter pub get
flutter run
# تثبيت Git
pkg install git -y
# حذف أي نسخة غير مكتملة من Flutter
rm -rf ~/flutter
# استنساخ Flutter من المصدر الرسمي
git clone https://github.com/flutter/flutter.git -b stable
# إعداد المسار
echo 'export PATH="$HOME/flutter/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
# التحقق من التثبيت
flutter doctor
# إنشاء مشروع جديد بالهيكل الرسمي
flutter create -t app rawah_erp_clean
# نقل ملفاتك القديمة (إذا كانت موجودة في ~/rawah_erp)
cp -r ~/rawah_erp/assets ~/rawah_erp_clean/
cp ~/rawah_erp/pubspec.yaml ~/rawah_erp_clean/
cp -r ~/rawah_erp/lib ~/rawah_erp_clean/
cp ~/rawah_erp/codemagic.yaml ~/rawah_erp_clean/
cp ~/rawah_erp/README.md ~/rawah_erp_clean/
# الدخول إلى المشروع الجديد
cd ~/rawah_erp_clean
# جلب الحزم وتجربة التشغيل
flutter pub get
flutter run
# تثبيت Git
pkg install git -y
# حذف أي نسخة غير مكتملة من Flutter
rm -rf ~/flutter
# استنساخ Flutter من المصدر الرسمي
git clone https://github.com/flutter/flutter.git -b stable
# إعداد المسار
echo 'export PATH="$HOME/flutter/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
# التحقق من التثبيت
flutter doctor
# إنشاء مشروع جديد بالهيكل الرسمي
flutter create -t app rawah_erp_clean
# نقل ملفاتك القديمة (إذا كانت موجودة في ~/rawah_erp)
cp -r ~/rawah_erp/assets ~/rawah_erp_clean/
cp ~/rawah_erp/pubspec.yaml ~/rawah_erp_clean/
cp -r ~/rawah_erp/lib ~/rawah_erp_clean/
cp ~/rawah_erp/codemagic.yaml ~/rawah_erp_clean/
cp ~/rawah_erp/README.md ~/rawah_erp_clean/
# الدخول إلى المشروع الجديد
cd ~/rawah_erp_clean
# جلب الحزم وتجربة التشغيل
flutter pub get
flutter run
flutter pub get
flutter run
ذدد
cd ~/rawah-erp
mkdir -p lib/presentation/pages/home
nano home_page.dart
cd ~/rawah_erp
nanomkdir -p lib/presentation/pages/home
mkdir -p lib/presentation/pages/home
nano lib/presentation/pages/home/home_page.dart
nano lib/main.dart
mkdir -p lib/presentation/pages/login
nano lib/presentation/pages/login/login_page.dart
mkdir -p lib/presentation/pages/login
nano lib/presentation/pages/login/login_page.dart
nano lib/main.dart
nano lib/presentation/pages/login/login_page.dart
nano lib/presentation/pages/home/home_page.dart
mkdir -p lib/presentation/pages/invoices
nano lib/presentation/pages/invoices/invoice_page.dart
nano lib/presentation/pages/home/home_page.dart
nano lib/presentation/widgets/invoice_header_form.dart
mkdir -p lib/presentation/widgets
nano lib/presentation/widgets/invoice_header_form.dart
mkdir -p lib/presentation/widgets
nano lib/presentation/widgets/product_table.dart
nano lib/utils/invoice_save_pdf.dart
mkdir -p lib/utils
nano lib/utils/invoice_save_pdf.dart
nano main.dart
nano lib/main.dart
nano lib/presentation/pages/home_page.dart
cd ~/perfume_accounting_app
cd ~
flutter create perfume_accounting_app
cd perfume_accounting_app
rm -rf lib/*
cd ~/storage/downloads
unzip flutter_project_ready.zip -d temp_ready
cp -r temp_ready/lib/* ~/perfume_accounting_app/lib/
cp temp_ready/pubspec.yaml ~/perfume_accounting_app/pubspec.yaml
cd ~/perfume_accounting_app
flutter pub get
cd ~/perfume_accounting_app
flutter pub get
flutter run
cd ~/storage/downloads/flutter_project_ready
git init
git remote add origin https://github.com/mohmadmossad/flutter_accounting_project.git
git add .
git commit -m "رفع محتويات flutter_project_ready إلى المستودع"
git push -u origin main
git config --global --add safe.directory /storage/emulated/0/Download/flutter_project_ready
git push -u origin main
cd ~/storage/downloads/flutter_project_ready
git init
git add .
git commit -m "أول رفع لمشروع flutter_accounting_project"
git branch -M main
git remote add origin https://github.com/mohmadmossad/flutter_accounting_project.git
git remote set-url origin https://github.com/mohmadmossad/flutter_accounting_project.git
cd ~/storage/downloads/MS.ACCOUNTS
git init
git remote add origin https://github.com/mohmadmossad/MS.ACCOUNTS.git
git add .
git commit -m "first commit"
git branch -M main
git push -u origin main
cd ~
nano upload_ms_accounts.sh
chmod +x upload_ms_accounts.sh
./upload_ms_accounts.sh
cd ~/storage/downloads/MS.ACCOUNTS
git remote -v
git config --global --add safe.directory /storage/emulated/0/Download/MS.ACCOUNTS
cd /storage/emulated/0/Download/MS.ACCOUNTS
git remote remove origin 2>/dev/null
git remote add origin https://github.com/mohmadmossad/MS.ACCOUNTS.git
git add .
git commit -m "first upload"
git branch -M main
git push -u origin main
cd ~/storage/downloads/MS.ACCOUNTS
nano codemagic.yaml
git add codemagic.yaml
git commit -m "add codemagic.yaml for Codemagic build"
git push -u origin main
cd ~/storage/downloads/MS.ACCOUNTS
nano codemagic.yaml
git add codemagic.yaml
git commit -m "Add AAB build support to Codemagic"
git push -u origin main
cd ~/storage/downloads/MS.ACCOUNTS
nano codemagic.yaml
git add codemagic.yaml
git commit -m "fix codemagic.yaml by removing android field"
git push -u origin main
flutter devices
cd /storage/emulated/0/Projects/MS.ACCOUNTS.-WEB
ls /storage/emulated/0
find /storage/emulated/0 -type d -name "*ACCOUNTS*-WEB*"
cd /storage/emulated/0/Download/MS.ACCOUNTS
git init -b main
git remote add origin https://github.com/mohmadmossad/MS.ACCOUNTS.-WEB.git
git remote -v
origin    https://github.com/USERNAME/OLD-REPO.git (fetch)
origin    https://github.com/USERNAME/OLD-REPO.git (push)
git remote set-url origin https://github.com/mohmadmossad/MS.ACCOUNTS.-WEB.git
git remote remove origin
git remote add origin https://github.com/mohmadmossad/MS.ACCOUNTS.-WEB.git
git add .
git commit -m "رفع أول نسخة"
git push -u origin main
flutter build web
flutter devices
cd build/web
# إذا لم تكن داخل المشروع نفّذ:
cd ~/workspace/MS.ACCOUNTS || cd /workspaces/MS.ACCOUNTS || cd /github/workspace
# تحقق من وجود ملف pubspec.yaml
ls -la | grep pubspec.yaml
# تأكد أنك في جذر المشروع
pwd
ls -la
# تحقق من حالة Git
git status
# تحقق من وجود remote
git remote -v
# إذا لم تكن مهيئًا مسبقًا
git init
# إذا كان هناك origin خاطئ نزيله أولاً (لا مشكلة إن لم يكن موجود)
git remote remove origin 2>/dev/null
# أضف رابط المستودع الصحيح
git remote add origin https://github.com/mohmadmossad/MS.ACCOUNTS.git
# أضف كل الملفات واعمل commit
git add .
git commit -m "Prepare for web build and deploy"
# ادفع الفرع الرئيسي
git branch -M main
git push -u origin main
# إذا لم تكن داخل المشروع نفّذ:
cd ~/workspace/MS.ACCOUNTS || cd /workspaces/MS.ACCOUNTS || cd /github/workspace
# تحقق من وجود ملف pubspec.yaml
ls -la | grep pubspec.yaml
flutter clean
flutter pub get
flutter build web --release
# بعد اكتمال الأمر تأكد من وجود المجلد
ls -la build/web
node -v && npm -v
# خيار 1: تثبيت عالمي (مرة واحدة)
npm install -g netlify-cli
# أو خيار 2: استخدام npx (لا تثبيت دائم)
# عند الحاجة ستستعمل npx netlify deploy ...
netlify login
# تأكد أنك في جذر المشروع
pwd
ls -la
# تحقق من حالة Git
git status
# تحقق من وجود remote
git remote -v
cd /storage/emulated/0/Download/
cp -r MS.ACCOUNTS.-WEB MS.ACCOUNTS
cd /storage/emulated/0/Download/
cp -r MS.ACCOUNTS.-WEB MS.ACCOUNTS
ls /storage/emulated/0/Download
cp -r "الاسم_الحقيقي" MS.ACCOUNTS
cd MS.ACCOUNTS
git remote remove origin
git remote add origin https://github.com/mohmadmossad/MS.ACCOUNTS.git
git push -u origin main
git remote remove origin
git remote add origin https://github.com/mohmadmossad/MS.ACCOUNTS.git
git push -u origin main
mkdir -p .github/workflows
nano .github/workflows/flutter-web.yml
git add .github/workflows/flutter-web.yml
git commit -m "إضافة البناء التلقائي للمستودع MS.ACCOUNTS"
git push
https://mohmadmossad.github.io/MS.ACCOUNTS/
mkdir -p .circleci
nano .circleci/config.yml
git add .circleci/config.yml
git commit -m "إضافة إعداد CircleCI لبناء Flutter Web"
git push
git push --set-upstream origin main
mkdir -p .circleci
nano .circleci/config.yml
git add .circleci/config.yml
git commit -m "إعداد CircleCI لبناء Flutter Web"
git push
cd ~/storage/downloads/MS.ACCOUNTS
git init
git branch -M main
git remote set-url origin https://github.com/mohmadmossad/MS.ACCOUNTS.git
git add .
git commit -m "Upload missing project files"
git push origin main
cd /storage/emulated/0/Download/MS.ACCOUNTS
mkdir -p .github/workflows
nano .github/workflows/flutter-web.yml
git add .github/workflows/flutter-web.yml
git commit -m "إضافة ملف البناء التلقائي لتطبيق Flutter Web"
git push
https://mohmadmossad.github.io/MS.ACCOUNTS.-WEB/
cd /storage/emulated/0/Download/
cp -r MS.ACCOUNTS.-WEB MS.ACCOUNTS
cd /storage/emulated/0/Download/MS
ls -la
# جرب استخدام بورت مختلف
python3 -m http.server 8080
# أو
python3 -m http.server 3000
nano index.html
# جرب استخدام بورت مختلف
python3 -m http.server 8080
# أو
python3 -m http.server 3000
# أو
# تشغيل الخادم
python3 -m http.server 8000
# أو باستخدام PHP
php -S localhost:8000
# أوقف الخادم الحالي (إذا كان يعمل) ثم أعد تشغيله
python3 -m http.server 8000
http://localhost:8000/#
