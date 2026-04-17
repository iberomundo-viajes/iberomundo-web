import Head from 'next/head'

export default function Home() {
  const procesarPago = async (destino, precio) => {
    const res = await fetch('/api/pagar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ destino, precio }),
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  };

  return (
    <div style={{ margin: 0, fontFamily: 'Inter, sans-serif', backgroundColor: '#f4f7fb' }}>
      <Head>
        <title>IberoMundo Viajes</title>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;800;900&family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      </Head>

      <style jsx global>{`
        :root { --blue: #0057b8; --dark: #0b1b3a; --orange: #ff8a00; --bg: #f4f7fb; }
        body { margin: 0; background: var(--bg); }
        header {
          position: sticky; top: 0; z-index: 1000; background: white;
          display: flex; justify-content: space-between; align-items: center;
          padding: 14px 5%; box-shadow: 0 10px 30px rgba(0,0,0,0.08);
        }
        .brand { font-family: Montserrat; font-size: 22px; font-weight: 900; color: var(--dark); }
        .brand span { color: var(--blue); }
        .whatsapp {
          background: #25D366; color: white; padding: 12px 18px;
          border-radius: 50px; font-weight: 800; text-decoration: none;
          display: flex; gap: 10px; align-items: center;
        }
        .hero {
          height: 560px; display: flex; flex-direction: column;
          justify-content: center; align-items: center; text-align: center; color: white;
          background: linear-gradient(120deg, rgba(0,40,90,0.85), rgba(0,0,0,0.5)),
          url('https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&w=1600&q=80') center/cover;
        }
        .hero h1 { font-family: Montserrat; font-size: clamp(40px,6vw,72px); margin: 0; font-weight: 900; }
        .hero p { margin-top: 15px; background: var(--orange); padding: 10px 18px; border-radius: 8px; font-weight: 800; }
        .trust { width: 92%; margin: 20px auto; display: grid; grid-template-columns: repeat(auto-fit,minmax(200px,1fr)); gap: 12px; text-align: center; }
        .trust div { background: white; padding: 12px; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); font-weight: 700; }
        .search { width: 92%; max-width: 1200px; margin: 20px auto 40px; background: white; padding: 25px; border-radius: 22px; box-shadow: 0 25px 60px rgba(0,0,0,0.18); display: grid; grid-template-columns: repeat(auto-fit,minmax(180px,1fr)); gap: 12px; }
        .search input, .search select { padding: 14px; border: 1px solid #ddd; border-radius: 12px; font-weight: 600; }
        .search button { background: linear-gradient(120deg, var(--blue), var(--dark)); color: white; border: none; border-radius: 12px; font-weight: 900; cursor: pointer; }
        .title { text-align: center; font-size: 32px; font-weight: 900; color: var(--dark); margin: 30px 0; }
        .grid { width: 92%; margin: auto; display: grid; grid-template-columns: repeat(auto-fit,minmax(240px,1fr)); gap: 18px; }
        .card { background: white; border-radius: 18px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.08); transition: 0.3s; }
        .card:hover { transform: translateY(-6px); }
        .card img { width: 100%; height: 160px; object-fit: cover; }
        .card-body { padding: 14px; }
        .card h3 { margin: 0; color: var(--blue); font-family: Montserrat; }
        .tag { display: inline-block; margin-top: 8px; background: #eaf7ee; color: #1c9b4a; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 800; }
        .price { display: flex; justify-content: space-between; align-items: center; margin-top: 12px; }
        .price span { font-size: 24px; font-weight: 900; color: var(--orange); }
        .btn { background: var(--blue); color: white !important; padding: 8px 12px; border-radius: 8px; text-decoration: none; font-weight: 800; border: none; cursor: pointer; }
        .why { margin-top: 70px; background: white; padding: 60px 5%; text-align: center; }
        .why-grid { margin-top: 40px; display: grid; grid-template-columns: repeat(auto-fit,minmax(220px,1fr)); gap: 20px; }
        .why-card { background: #f7f9fc; padding: 20px; border-radius: 14px; text-align: left; }
        footer { background: white; margin-top: 60px; padding: 40px 20px; text-align: center; border-top: 1px solid #eee; }
      `}</style>

      <header>
        <div className="brand">IBEROMUNDO <span>VIAJES</span></div>
        <a className="whatsapp" href="https://wa.me/34697797858">
          <i className="fab fa-whatsapp"></i> WhatsApp
        </a>
      </header>

      <section className="hero">
        <h1>VIVE LATINOAMÉRICA</h1>
        <p>EXPERIENCIAS QUE TE CAMBIAN LA VIDA</p>
      </section>

      <div className="trust">
        <div>🔒 Pagos seguros</div>
        <div>✈️ Aerolíneas reales</div>
        <div>⚡ Reserva inmediata</div>
        <div>💬 Soporte WhatsApp</div>
      </div>

      <div className="search">
        <select><option>Tipo de viaje</option><option>Solo ida</option><option>Ida y vuelta</option></select>
        <input placeholder="Origen" />
        <input placeholder="Destino" />
        <input type="date" />
        <input type="date" />
        <input type="number" defaultValue="1" />
        <button>Buscar vuelos</button>
      </div>

      <h2 className="title">Destinos Estrella</h2>

      <div className="grid">
        {/* BOGOTA */}
        <div className="card">
          <img src="https://images.unsplash.com/photo-1491557345352-5929e343eb89" alt="Bogotá" />
          <div className="card-body">
            <h3>Bogotá</h3>
            <span className="tag">Colombia</span>
            <div className="price">
              <span>485€</span>
              <button className="btn" onClick={() => procesarPago('Bogotá', 485)}>Reservar</button>
            </div>
          </div>
        </div>

        {/* LIMA */}
        <div className="card">
          <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470" alt="Lima" />
          <div className="card-body">
            <h3>Lima</h3>
            <span className="tag">Perú</span>
            <div className="price">
              <span>610€</span>
              <button className="btn" onClick={() => procesarPago('Lima', 610)}>Reservar</button>
            </div>
          </div>
        </div>
      </div>

      <section className="why">
        <h2>¿Por qué elegirnos?</h2>
        <div className="why-grid">
          <div className="why-card">💰 Precios reales</div>
          <div className="why-card">🤝 Atención personalizada</div>
          <div className="why-card">🔒 Reserva segura</div>
          <div className="why-card">🌎 Especialistas LATAM</div>
        </div>
      </section>

      <footer>
        <b>IberoMundo Viajes</b>
        <p>© 2026 - Agencia de viajes profesional</p>
      </footer>
    </div>
  )
}