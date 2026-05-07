# Clase 7 - Documentación Completa del Proyecto
# Fecha: 2026-05-06
# Proyecto: clase7c (React Native + Expo + TypeScript)
# Estado: COMPLETADO ✅ (Fases 1, 2 y 3)

---

## METODOLOGÍA DEL PROFESOR
- Crear proyecto vacío con Expo CLI
- Ir creando carpetas progresivamente mientras se explica
- Componentes vacíos primero, luego llenarlos en el repositorio
- Copiar y pegar cada pieza con explicación general + específica
- Retos simples para los alumnos (agregar marca, stock, etc.)

---

## DEPENDENCIAS INSTALADAS
```
npx expo install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs @react-navigation/drawer react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated
npx expo install @expo/vector-icons expo-status-bar
npx expo install @react-native-async-storage/async-storage
npx expo install @gorhom/bottom-sheet
```

---

## ESTRUCTURA DE CARPETAS
```
clase7c/
├── App.tsx
├── index.ts
├── package.json
├── src/
│   ├── components/
│   │   ├── Header.tsx          (Logo TECHSTORE, menú/toggle tema, botón retroceso)
│   │   ├── Footer.tsx          (Copyright, redes sociales, versión)
│   │   ├── CheckoutModal.tsx   (Modal de compra con imagen + resumen)
│   │   └── CartBottomSheet.tsx (Panel deslizable @gorhom/bottom-sheet)
│   ├── constants/
│   │   ├── theme.ts            (lightTheme y darkTheme)
│   │   └── util.js             (formatCurrency, formatDate, formatDateTime, getRelativeTime, truncateText, capitalize, getGreeting)
│   ├── context/
│   │   ├── AuthContext.tsx     (Auth + AsyncStorage + dummyjson login)
│   │   ├── ThemeContext.tsx    (Theme + AsyncStorage)
│   │   ├── CartContext.tsx     (Estado del carrito: CRUD + isInCart + getCartQuantity)
│   │   └── FavoritesContext.tsx (Favoritos + AsyncStorage)
│   ├── navigation/
│   │   ├── RootStack.tsx       (Navegación condicional: Login → Drawer)
│   │   ├── DrawerNavigator.tsx (Tienda, Ajustes, Soporte)
│   │   ├── TabNavigator.tsx    (5 tabs: Tienda, Explorar, Carrito, Favoritos, Perfil)
│   │   └── HomeStack.tsx       (Home → Details)
│   ├── screens/
│   │   ├── LoginScreen.tsx     (Login con dummyjson auth API)
│   │   ├── HomeScreen.tsx      (Grid de categorías desde dummyjson)
│   │   ├── DetailsScreen.tsx   (Productos por categoría con imágenes, favoritos, badge carrito)
│   │   ├── ExploreScreen.tsx   (Búsqueda funcional con debounce + favoritos + carrito)
│   │   ├── FavoritesScreen.tsx (Lista de favoritos con agregar al carrito y eliminar)
│   │   ├── ProfileScreen.tsx   (Perfil con foto real, nombre, email, menú de opciones)
│   │   ├── SettingsScreen.tsx  (Toggle tema, info app, soporte, logout)
│   │   ├── SupportScreen.tsx   (Contacto con Linking, FAQ expandible, formulario)
│   │   └── CartScreen.tsx      (Carrito completo + confirmar pedido + respuesta API)
│   └── services/
│       ├── ProductService.ts   (API dummyjson: categorías, productos, búsqueda)
│       ├── AuthService.ts      (API dummyjson auth: login, getUserProfile)
│       └── OrderService.ts     (API dummyjson carts: createOrder, getUserCarts)
└── ...
```

---

## FASE 1 - ARCHIVOS BASE (clase7a)

### 1. constants/theme.ts
- `lightTheme`: fondo claro (#F8FAFC), superficie blanca, primary indigo (#6366F1)
- `darkTheme`: fondo oscuro (#0F172A), superficie slate (#1E293B), primary claro (#818CF8)
- Spacing (xs, sm, md, lg, xl) y roundness (sm, md, lg, full)

### 2. context/ThemeContext.tsx
- Provee `theme`, `isDark`, `toggleTheme`
- Persistencia con AsyncStorage (clave `theme`)
- Pantalla de carga (`loaded`) para evitar parpadeo al iniciar

### 3. services/ProductService.ts (versión mock)
- Interface Product: id, name, price, category, brand, stock
- Array PRODUCTS con 6 productos mock
- Función `getProductsByCategory(category: string): Product[]`

### 4. context/AuthContext.tsx (versión mock)
- Login con validación local (admin@techstore.com / admin123)
- Interface AuthContextType: isAuthenticated, login, logout, user, loginError

### 5. components/Header.tsx y Footer.tsx
- Header: Logo TECHSTORE (ícono flash + texto), botón menú drawer / retroceso, toggle tema
- Footer: Copyright © 2026 TechStore S.A., iconos Instagram/Twitter, versión

### 6. screens/LoginScreen.tsx (versión mock)
- Campos email + contraseña, validación, mensaje de error

### 7. screens/HomeScreen.tsx
- Grid de categorías hardcodeadas (móvil, laptop, impresoras, ofertas)
- Navegación a Details con params (category, title)

### 8. screens/DetailsScreen.tsx
- Usa `getProductsByCategory()` para mostrar productos
- Muestra marca y stock, maneja estado vacío

### 9. screens/ExploreScreen.tsx, FavoritesScreen.tsx
- Pantallas placeholder con ícono y texto

### 10. App.tsx
- GestureHandlerRootView > AuthProvider > ThemeProvider > CartProvider > NavigationContainer > RootStack

### 11. navigation/RootStack.tsx, TabNavigator.tsx, HomeStack.tsx
- Navegación base creada

---

## FASE 2 - COMPLETADA ✅ (clase7b)

### Paso 1: SettingsScreen.tsx
- Toggle modo oscuro/claro conectado a ThemeContext
- Sección de información (app v1.0.0, React Native + Expo, proyecto académico)
- Botón cerrar sesión con confirmación Alert
- Sección "AYUDA" con acceso a Soporte

### Paso 2: SupportScreen.tsx
- Contacto: Email (mailto), Teléfono (tel), WhatsApp (wa.me) usando Linking
- FAQ expandible con 4 preguntas frecuentes (pedido, pago, envío, devolución)
- Formulario textarea para enviar consulta con Alert de confirmación

### Paso 3: ProfileScreen.tsx
- Tarjeta de perfil con avatar, nombre del usuario, email, @username
- Menú: Ajustes (→ Drawer), Soporte (→ Drawer), Favoritos, Cerrar Sesión
- Usa `getParent()` para acceder al Drawer padre

### Paso 4: RootStack + DrawerNavigator
- **DrawerNavigator**: 3 opciones → Tienda (TabNavigator), Ajustes, Soporte
- **RootStack**: Login → (autenticado) → DrawerNavigator
- `useFocusEffect` en TabNavigator para resetear al tab Tienda al volver del Drawer

### Paso 5: CheckoutModal + CartContext
- **CartContext**: `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart`, `totalItems`
- **CheckoutModal**: Modal pantalla completa con imagen del producto, resumen, botones "Añadir al Carrito" y "Comprar Ahora"
- DetailsScreen: botón "Añadir" abre CheckoutModal

### Paso 6: CartBottomSheet + CartScreen
- **CartScreen**: items del carrito, controles +/-, botón vaciar, total calculado, modal de confirmación (web-compatible)
- **CartBottomSheet**: @gorhom/bottom-sheet con 3 snap points (25%, 50%, 75%), backdrop
- Tab "Carrito" con badge rojo (`totalItems`)

### Paso 7: AsyncStorage en AuthContext y ThemeContext
- AuthContext: guarda `authUser` al login, restaura al cargar, elimina al logout
- ThemeContext: guarda `light`/`dark`, restaura al cargar con pantalla de carga

### Paso 8: Limpieza
- Eliminado botón flotante redundante de RootStack
- Confirmación al eliminar items del carrito

---

## FASE 3 - COMPLETADA ✅ (clase7c)

### Paso 1: Reemplazar datos mock por dummyjson API

#### services/ProductService.ts (reescrito)
```
API: https://dummyjson.com
- getCategories() → GET /products/categories → retorna Category[] con {name, slug}
- getProductsByCategory(slug) → GET /products/category/{slug} → retorna Product[]
- searchProducts(query) → GET /products/search?q={query} → retorna Product[]
- getAllProducts() → GET /products?limit=0 → retorna todos los productos
- clearCache() → limpia caché de categorías, productos y búsquedas
```
- **Caché interno** para cada tipo de llamada (evita peticiones duplicadas)
- Interface Product actualizada: `id: number`, `price: number` (antes string), + `thumbnail`, `rating`, `description`

#### services/AuthService.ts (nuevo)
```
API: https://dummyjson.com/auth
- login({username, password}) → POST /auth/login → retorna AuthUser con token
- getUserProfile(token) → GET /auth/me → retorna perfil completo
```

#### services/OrderService.ts (nuevo)
```
API: https://dummyjson.com/carts
- createOrder(userId, products[]) → POST /carts/add → retorna CreateOrderResponse
- getUserCarts(userId) → GET /carts/user/{id} → retorna historial de carritos
```

### Paso 2: Screens actualizados para usar API

#### HomeScreen.tsx
- Carga categorías reales con `getCategories()` (limitado a 20)
- Mapeo de slugs a íconos y colores (`CATEGORY_ICONS`, `CATEGORY_COLORS`)
- Estado de loading con ActivityIndicator

#### DetailsScreen.tsx
- Carga productos con `getProductsByCategory(category)` usando `useEffect`
- Imágenes reales con `<Image source={{ uri: item.thumbnail }}>`
- **Botón favoritos** (❤️) al lado del nombre del producto
- **Badge verde** con cantidad si el producto está en el carrito

#### ExploreScreen.tsx
- **Búsqueda funcional** con `searchProducts(query)` + debounce de 400ms
- Campo TextInput con ícono, botón limpiar (X), autoCapitalize="none"
- Resultados: imagen, nombre truncado, marca, categoría, precio, botón + (carrito) y ❤️ (favoritos)
- Estados: placeholder, cargando, resultados, sin resultados

#### CartScreen.tsx
- **Confirmación antes del pedido**: modal pregunta "¿Confirmar pedido?" con total
- **Envío a API**: `createOrder(userId, products)` al confirmar
- **Respuesta del servidor**: muestra JSON crudo de dummyjson (id, products, total, discountedTotal, etc.)
- Limpia el carrito solo al cerrar el modal de confirmación

#### LoginScreen.tsx
- Campo "Usuario" en vez de "Email"
- Llama a `AuthService.login()` con POST a dummyjson
- **Loading state**: muestra ActivityIndicator en botón mientras autentica
- **Botón "Usar cuenta demo"** que auto-rellena con emilys/emilyspass
- Mensajes de error reales del API

#### ProfileScreen.tsx
- Foto real del usuario con `<Image source={{ uri: user.image }}>`
- Nombre completo, email, @username del usuario logueado

### Paso 3: Favoritos funcionales

#### context/FavoritesContext.tsx (nuevo)
- `favorites: Product[]` - lista de productos guardados
- `addToFavorites(product)` - agrega si no existe
- `removeFromFavorites(id)` - elimina del array
- `isFavorite(id)` - verifica si existe
- `toggleFavorite(product)` - agrega o quita según estado
- `favoritesCount` - cantidad de favoritos
- **Persistencia con AsyncStorage** (clave `favorites`)
- Pantalla de carga (`loaded`) para evitar parpadeo

#### FavoritesScreen.tsx (reescrito)
- Lista de favoritos con imagen, nombre, marca, precio
- Botón agregar al carrito (🛒) y eliminar de favoritos (💔)
- Estado vacío con mensaje e ícono

### Paso 4: Formateo de moneda y utilidades

#### constants/util.js (actualizado)
- `formatCurrency(amount: number)` → `$2.203,50` (formato local con punto de miles, coma decimal)
- `formatDate(date)` → `13/05/2026`
- `formatDateTime(date)` → `13/05/2026 14:30`
- `getRelativeTime(date)` → `Hace 5 min`, `Hace 2h`, `Ayer`
- `truncateText(text, maxLength)` → texto con `...` si excede
- `capitalize(text)` → Primera Letra De Cada Palabra
- `getGreeting()` → Buenos días / Buenas tardes / Buenas noches

### Paso 5: CartContext mejorado
- `isInCart(productId)` → boolean
- `getCartQuantity(productId)` → número de unidades

### Paso 6: App.tsx actualizado
- Agregado `FavoritesProvider` al árbol de providers

---

## FLUJO DE LA APP (versión final)

```
LoginScreen → (dummyjson auth: emilys/emilyspass) → Drawer
├── Tienda (TabNavigator)
│   ├── Tienda → HomeScreen (categorías reales) → DetailsScreen (productos con imágenes)
│   ├── Explorar → búsqueda + debounce + resultados
│   ├── Carrito → items, +/-, vaciar, confirmar pedido → OrderService → respuesta API
│   ├── Favoritos → lista con carrito y eliminar
│   └── Perfil → foto real, nombre, email, @username, menú de opciones
├── Ajustes → toggle tema, info, soporte, logout
└── Soporte → contacto (email/tel/WhatsApp), FAQ, formulario

Detalles → ❤️ favorito + "Añadir" → CheckoutModal → Añadir al carrito / Comprar ahora
Carrito → confirmar pedido → modal con respuesta JSON de dummyjson
```

---

## APIs UTILIZADAS (dummyjson.com)

| Endpoint | Método | Uso |
|----------|--------|-----|
| `/auth/login` | POST | Autenticar usuario |
| `/auth/me` | GET | Obtener perfil (con token) |
| `/products/categories` | GET | Lista de categorías |
| `/products/category/{slug}` | GET | Productos por categoría |
| `/products/search?q=` | GET | Búsqueda de productos |
| `/products?limit=0` | GET | Todos los productos |
| `/carts/add` | POST | Crear carrito/pedido |
| `/carts/user/{id}` | GET | Historial de carritos |

---

## ARCHIVOS COMPLETOS (versión final)

| Archivo | Estado | Notas |
|---------|--------|-------|
| App.tsx | ✅ | Con FavoritesProvider |
| constants/theme.ts | ✅ | light + dark |
| constants/util.js | ✅ | 7 utilidades |
| context/AuthContext.tsx | ✅ | Con dummyjson login + AsyncStorage |
| context/ThemeContext.tsx | ✅ | Con AsyncStorage |
| context/CartContext.tsx | ✅ | CRUD + isInCart + getCartQuantity |
| context/FavoritesContext.tsx | ✅ | CRUD + toggle + AsyncStorage |
| components/Header.tsx | ✅ | Logo, menú/retroceso, toggle tema |
| components/Footer.tsx | ✅ | Copyright, redes, versión |
| components/CheckoutModal.tsx | ✅ | Con imagen y formatCurrency |
| components/CartBottomSheet.tsx | ✅ | Con imágenes y formatCurrency |
| navigation/RootStack.tsx | ✅ | Login → Drawer |
| navigation/DrawerNavigator.tsx | ✅ | Tienda, Ajustes, Soporte |
| navigation/TabNavigator.tsx | ✅ | 5 tabs con badge |
| navigation/HomeStack.tsx | ✅ | Home → Details |
| screens/LoginScreen.tsx | ✅ | dummyjson auth + demo user |
| screens/HomeScreen.tsx | ✅ | Categorías reales con iconos |
| screens/DetailsScreen.tsx | ✅ | Imágenes + favoritos + badge carrito |
| screens/ExploreScreen.tsx | ✅ | Búsqueda + debounce + favoritos |
| screens/FavoritesScreen.tsx | ✅ | Lista + carrito + eliminar |
| screens/ProfileScreen.tsx | ✅ | Foto real + info del usuario |
| screens/SettingsScreen.tsx | ✅ | Toggle tema, info, soporte |
| screens/SupportScreen.tsx | ✅ | Contacto, FAQ, formulario |
| screens/CartScreen.tsx | ✅ | Confirmación + OrderService + respuesta JSON |
| services/ProductService.ts | ✅ | API dummyjson + caché |
| services/AuthService.ts | ✅ | Login dummyjson |
| services/OrderService.ts | ✅ | Crear pedido dummyjson |

---

## CONCEPTOS ENSEÑADOS

### Fase 1
1. Creación de proyecto Expo
2. Estructura de carpetas organizada
3. Temas light/dark
4. Navegación Stack + Tab
5. Componentes reutilizables (Header, Footer)

### Fase 2
6. Context API (Auth, Theme, Cart)
7. AsyncStorage para persistencia
8. Drawer Navigator
9. BottomSheet deslizable
10. Modal personalizado (web-compatible)
11. Tab Badge
12. Navegación entre navegadores (`getParent`)

### Fase 3
13. Consumo de API REST (fetch)
14. Caché de respuestas
15. Búsqueda con debounce
16. Estado de loading
17. Formato de moneda local
18. Favoritos con persistencia
19. Confirmación antes de acción destructiva
20. Mostrar respuesta JSON del servidor
21. Imágenes remotas con `<Image>`
22. Indicadores visuales (badge carrito, corazón favoritos)

---

## RETOS PARA ALUMNOS
1. Reemplazar datos mock por API real ✅ (hecho)
2. Implementar búsqueda funcional ✅ (hecho)
3. Hacer favoritos funcionales ✅ (hecho)
4. Agregar envío de pedido a API ✅ (hecho)
5. Agregar pull-to-refresh a las listas
6. Agregar paginación a los productos
7. Crear pantalla de detalle individual del producto
8. Agregar notificaciones push

---

## ESTADO ACTUAL
- **FASE 3 COMPLETADA** ✅
- App completa con: Login real (dummyjson), productos reales, búsqueda, favoritos, carrito, pedido con API
- Tema y sesión persisten con AsyncStorage
- Formato de moneda local ($2.203,50)
- Utilidades listas para uso global
- Listo para presentar y para replicar en React (carritoDummyjson)
