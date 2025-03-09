import React from 'react';

const RegistrationPage = () => {
  const event = {
    name: "Tech Conference 2023",
    date: "2023-11-15",
    duration: "8 hours",
    description: "Annual technology conference featuring keynote speakers and workshops.",
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Eventify</h1>
        <nav style={styles.nav}>
          <a href="#" style={styles.navLink}>Home</a>
          <a href="#" style={styles.navLink}>About Us</a>
          <a href="#" style={styles.navLink}>Contact</a>
          <a href="#" style={styles.navLink}>Login</a>
          <a href="#" style={styles.navLink}>SignUp</a>
        </nav>
      </header>

      <main style={styles.main}>
        <div style={styles.eventBanner}>
          <h2 style={styles.eventTitle}>{event.name}</h2>
          <p style={styles.eventDetail}>Date: {event.date}</p>
          <p style={styles.eventDetail}>Duration: {event.duration}</p>
          <p style={styles.eventDescription}>{event.description}</p>
        </div>

        <h2 style={styles.subtitle}>Register for the Event</h2>
        <form style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="fullName" style={styles.label}>Full Name</label>
            <input
              type="text"
              id="fullName"
              placeholder="Enter your full name"
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>Email address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="phone" style={styles.label}>Phone Number</label>
            <input
              type="tel"
              id="phone"
              placeholder="Enter your phone number"
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>Register Now</button>
        </form>
      </main>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f4f4f9',
    padding: '20px',
  },
  header: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '40px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
  },
  nav: {
    display: 'flex',
    gap: '20px',
  },
  navLink: {
    textDecoration: 'none',
    color: '#333',
    fontSize: '16px',
  },
  main: {
    width: '100%',
    maxWidth: '800px',
    textAlign: 'center',
  },
  eventBanner: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '30px',
  },
  eventTitle: {
    fontSize: '28px',
    marginBottom: '10px',
  },
  eventDetail: {
    fontSize: '16px',
    marginBottom: '5px',
  },
  eventDescription: {
    fontSize: '14px',
    fontStyle: 'italic',
  },
  subtitle: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  formGroup: {
    marginBottom: '15px',
    textAlign: 'left',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontSize: '14px',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default RegistrationPage;