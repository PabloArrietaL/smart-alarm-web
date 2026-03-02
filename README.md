# Smart Alarm Web

Aplicación web de gestión de alarmas desarrollada con **Angular 19** y **Angular Material**. Permite crear, editar, eliminar y visualizar alarmas con prioridades, repeticiones y notificaciones previas.

## Tecnologías

- Angular 19.2
- Angular Material 19.2
- Angular CDK 19.2
- TypeScript 5.7
- RxJS 7.8
- Angular SSR

## Requisitos Previos

- Node.js >= 18.x
- npm >= 9.x
- Angular CLI >= 19.2

## Instalación

```bash
git clone <url-del-repositorio>
cd smart-alarm-web
npm install
```

## Ejecución

```bash
ng serve
```

Navegar a `http://localhost:4200`. La aplicación redirige automáticamente a `/login`.

## Estructura del Proyecto

```
src/app/
├── guards/
│   ├── auth.guard.ts              # Protege rutas autenticadas
│   └── no-auth.guard.ts           # Bloquea login si ya hay sesión
├── models/
│   └── alarm.ts                   # Interfaces Alarm y HistoryEntry
├── modules/
│   ├── auth/
│   │   ├── login/                 # Componente de inicio de sesión
│   │   ├── register/              # Componente de registro
│   │   ├── auth.module.ts
│   │   └── auth-routing.module.ts
│   ├── dashboard/
│   │   ├── dashboard/             # Vista principal post-login
│   │   ├── stats-cards/           # Tarjetas de estadísticas
│   │   ├── alarm-table/           # Tabla de alarmas con acciones
│   │   ├── dashboard.module.ts
│   │   └── dashboard-routing.module.ts
│   ├── alarm-create/
│   │   ├── alarm-create/          # Formulario de creación
│   │   ├── alarm-create.module.ts
│   │   └── alarm-create-routing.module.ts
│   ├── alarm-edit/
│   │   ├── alarm-edit/            # Formulario de edición
│   │   ├── alarm-edit.module.ts
│   │   └── alarm-edit-routing.module.ts
│   └── history/
│       ├── history/               # Historial de actividad
│       ├── history.module.ts
│       └── history-routing.module.ts
├── services/
│   ├── auth.service.ts            # Autenticación con localStorage
│   └── alarm.service.ts           # CRUD de alarmas con BehaviorSubject
├── shared/
│   ├── delete-alarm-modal/        # Modal de confirmación de eliminación
│   └── shared.module.ts
├── app.component.ts               # Componente raíz (standalone)
├── app.config.ts                  # Configuración de providers
└── app.routes.ts                  # Rutas con lazy loading
```

## Arquitectura

La aplicación sigue una arquitectura **modular con lazy loading**. Cada módulo funcional se carga bajo demanda a través de `loadChildren` en las rutas.

Todos los componentes son **standalone** (comportamiento por defecto en Angular 19), lo que significa que cada componente declara sus propias dependencias en el array `imports` de su decorador `@Component`.

### Rutas

| Ruta | Módulo | Guard | Descripción |
|------|--------|-------|-------------|
| `/login` | AuthModule | NoAuthGuard | Inicio de sesión |
| `/register` | AuthModule | NoAuthGuard | Registro de usuario |
| `/dashboard` | DashboardModule | AuthGuard | Panel principal |
| `/create` | AlarmCreateModule | AuthGuard | Crear alarma |
| `/edit/:id` | AlarmEditModule | AuthGuard | Editar alarma |
| `/history` | HistoryModule | AuthGuard | Historial de actividad |

### Servicios

**AuthService**: Gestiona la autenticación mediante `localStorage`. Compatible con SSR mediante detección de plataforma (`isPlatformBrowser`). Métodos: `login()`, `logout()`, `isAuthenticated()`.

**AlarmService**: Administra el CRUD de alarmas usando `BehaviorSubject` para reactividad. Provee datos mock y métodos para estadísticas e historial.

### Guards

**AuthGuard**: Protege las rutas que requieren sesión activa. Si el usuario no está autenticado, redirige a `/login`.

**NoAuthGuard**: Impide el acceso a las pantallas de login/registro cuando ya existe una sesión activa. Redirige a `/dashboard`.

## Funcionalidades

- **Login mockup**: Inicio de sesión con un solo clic, sin validación de credenciales
- **Registro**: Formulario con campos de nombre, email, contraseña y confirmación
- **Dashboard**: Vista principal con tarjetas de estadísticas y tabla de alarmas
- **Crear alarma**: Selector de hora, repetición, notificación previa, etiqueta y prioridad (baja/media/alta)
- **Editar alarma**: Formulario precargado con los datos de la alarma seleccionada
- **Eliminar alarma**: Modal de confirmación con detalles de la alarma antes de eliminar
- **Historial**: Registro de actividad con filtros por período, acción y etiqueta, con paginación
- **Cierre de sesión**: Botón en el toolbar que limpia la sesión y redirige al login

## Modelo de Datos

```typescript
interface Alarm {
  id: number;
  time: string;              // "07:00"
  repeat: string;            // "Diario", "L-V", "Una vez"
  repeatType: 'once' | 'daily' | 'weekdays' | 'weekend' | 'custom';
  label: string;
  priority: string;          // "Alta", "Media", "Baja"
  priorityLevel: 'low' | 'medium' | 'high';
  notification: string;
  active: boolean;
}

interface HistoryEntry {
  date: string;
  time: string;
  label: string;
  status: 'triggered' | 'snoozed' | 'edited' | 'deleted' | 'created';
  statusText: string;
  color: string;
}
```

## Documentación de Diseño

El proyecto fue desarrollado a partir de la siguiente documentación UX:

- **User Flows**: Flujos de usuario para mobile y web
- **Red Route Analysis**: Priorización de funcionalidades por frecuencia de uso
- **MVP Planning**: Roadmap de funcionalidades por fase (MVP, corto, mediano y largo plazo)
- **Pantallas**: Inventario de pantallas y navegación entre vistas

## Autor

Pablo Arrieta
