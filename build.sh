#!/usr/bin/env bash
set -e

echo "🚀 بدء تجهيز المشروع..."

# 1- مسار المشروع (عدله إذا لزم)
PROJECT="$HOME/mohasib_rawa_codemagic_ready"

# 2- فك الضغط إذا المجلد مش موجود
if [ ! -d "$PROJECT" ]; then
  echo "📦 فك الضغط..."
  unzip $HOME/mohasib_rawa_codemagic_ready.zip -d $HOME/
fi

cd $PROJECT

# 3- تنظيف المشروع
echo "🧹 تنظيف المشروع..."
flutter clean || true
rm -f pubspec.lock
rm -rf build/

# 4- تثبيت الحزم
echo "📥 تثبيت الحزم..."
flutter pub get
flutter pub upgrade

# 5- بناء APK
echo "🏗️ بناء نسخة Release..."
flutter build apk --release

# 6- نسخ APK للذاكرة الداخلية
echo "📲 نسخ الملف إلى /sdcard/ ..."
cp build/app/outputs/flutter-apk/app-release.apk /sdcard/mohasib_rawa.apk

echo "✅ تم بناء التطبيق بنجاح!"
echo "👉 APK موجود في /sdcard/mohasib_rawa.apk"

