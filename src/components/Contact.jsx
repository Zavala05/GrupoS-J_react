import { useState } from 'react';

export default function Contact() {
  const [result, setResult] = useState("");
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    mensaje: ''
  });

  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar el formulario
    console.log('Formulario enviado:', formData);
    setEnviado(true);
    
    // Limpiar el formulario después de 3 segundos
    setTimeout(() => {
      setFormData({
        nombre: '',
        correo: '',
        telefono: '',
        mensaje: ''
      });
      setEnviado(false);
    }, 3000);
  };


  //Funcion de envio de correo utilizando web3
 const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "19f009f5-7028-43c0-9a4a-c9204ad744ab");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Mensaje Enviado Exitosamente!");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="container">
        <h2 className="section-title contact-title">Contáctanos</h2>
        
        <div className="contact-wrapper">
          <div className="contact-info">
            <div className="info-item">
              <h4>📞 Teléfono / WhatsApp</h4>
              <a href="tel:+50433276274" style={{ color: 'inherit', textDecoration: 'none', fontWeight: 800 }}>+504 3327-62-74</a>
              <p>Disponible de lunes a viernes, 8:00 AM - 5:00 PM</p>
            </div>

            <div className="info-item">
              <h4>📧 Correo Electrónico</h4>
              <a href="mailto:sales@gruposyjhn.com" style={{ color: 'inherit', textDecoration: 'none', fontWeight: 800 }}>sales@gruposyjhn.com</a>
              <p>Respuesta rápida a todas tus consultas</p>
            </div>

            <div className="info-item">
              <h4>📍 Ubicación</h4>
              <p>
                Anillo Periférico, Sector Salamanca<br />
                San Pedro Sula, Cortés, Honduras
              </p>
            </div>
          </div>

        <form className='Contact_form' onSubmit={onSubmit}>
        <h4>Nombre:</h4>
        <input type="text" name="name" required/>
        <h4>Correo Electrónico:</h4>
        <input type="email" name="email" required/>
        <h4>Mensaje:</h4>
        <textarea name="message" required></textarea>

        <button type="submit">Enviar</button>
        <span>{result}</span>
      </form>
        </div>
      </div>
    </section>
  );
}
