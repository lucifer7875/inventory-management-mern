import ProductsPage from './pages/ProductsPage'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans antialiased text-foreground">
      <header className="sticky top-0 z-40 border-b border-slate-200/50 bg-white/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-primary to-blue-400 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-primary/20">I</div>
            <span className="text-2xl font-bold tracking-tight text-slate-900">Inventory Manager<span className="text-primary">.</span></span>
          </div>
          <nav className="flex items-center gap-8 text-sm font-semibold">
            <a href="#" className="text-primary hover:text-primary/80 transition-all">Products</a>
          </nav>
        </div>
      </header>
      <main>
        <ProductsPage />
      </main>
      <footer className="mt-auto py-6 border-t bg-muted/30">
        <div className="container mx-auto px-4 text-center text-xs text-muted-foreground">
          &copy; 2026 Inventory Manager System. Built with React 19 & Node.js.
        </div>
      </footer>
    </div>
  )
}

export default App
