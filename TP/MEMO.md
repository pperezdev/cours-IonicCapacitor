# IOS (mac only)
--- 

Installer la librairie ios
```
npm install @capacitor/ios
```

build l'application
```
npm run build
```

Cocoapods est un packagemanager qui fixe les versions swift.

Créer l'app native ios
```
npx cap add ios --packagemanager cocoapods
```

Synchroniser votre code
```
npx cap sync ios
```

Nouveau terminal juste pour ces deux commandes
```
cd ios/App
pod install
```

Ouvrir xCode
```
npx cap open ios
```

Dans Xcode
```
File -> Packages -> Reset Package Caches
File -> Packages -> Resolve Package Versions
Product -> Clean Build Folder
Rebuild
```

# ANDROID
--- 

Installer la librairie android
```
npm install @capacitor/android
```

build l'application
```
npm run build
```

Créer l'app native android
```
npx cap add android
```

Synchroniser votre code
```
npx cap sync android
```

Ouvrir Android Studio
```
npx cap open android
```
