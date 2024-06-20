const BASE_URL = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", () => {
  // Login form submission
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        const response = await axios.post(`${BASE_URL}/api/auth/login`, {
          email,
          password,
        });
        const { role, token } = response.data;
        localStorage.setItem("role", role);
        localStorage.setItem("token", token);

        if (role === "admin") {
          window.location.href = "admin-dashboard.html";
        } else if (role === "user") {
          window.location.href = "user-dashboard.html";
        }
      } catch (error) {
        console.error("Login error:", error);
        alert("Invalid credentials. Please try again.");
      }
    });
  }

  
    // Signup form submission
    const signupForm = document.getElementById("signup-form");
    if (signupForm) {
      signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
          const response = await axios.post(`${BASE_URL}/api/auth/signup`, {
            username,
            email,
            password,
          });
          alert("Sign-up successful. Please login.");
          window.location.href = "login.html";
        } catch (error) {
          console.error("Signup error:", error);
          alert("Signup failed. Please try again.");
        }
      });
    }
  

  // Role-based dashboard display
  const role = localStorage.getItem("role");
  if (role) {
    const adminDashboard = document.getElementById("admin-dashboard");
    const userDashboard = document.getElementById("user-dashboard");

    if (adminDashboard && role === "admin") {
      adminDashboard.style.display = "block";
    } else if (userDashboard && role === "user") {
      userDashboard.style.display = "block";
    }
  }

  // Fetch appointments based on role
  const token = localStorage.getItem("token");
  if (role && token) {
    axios.get(`${BASE_URL}/api/appointments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      const appointments = response.data;
      console.log("Fetched Appointments:", appointments);
      // Process appointments data based on role, e.g., update UI
    })
    .catch(error => {
      console.error("Fetch Appointments error:", error);
      // Handle error fetching appointments
    });
  }

  // Patient registration form submission
  const registerPatientForm = document.getElementById("register-patient-form");
  if (registerPatientForm) {
    registerPatientForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const patientData = {
        name: document.getElementById("patient-name").value,
        dob: document.getElementById("patient-dob").value,
        // Add more fields as needed
      };

      try {
        const response = await axios.post(`${BASE_URL}/api/patients`, patientData);
        console.log("Patient registered:", response.data);
        alert("Patient registered successfully.");
      } catch (error) {
        console.error("Patient registration error:", error);
        alert("Patient registration failed. Please try again.");
      }
    });
  }

  // Appointment booking form submission
  const bookAppointmentForm = document.getElementById("book-appointment-form");
  if (bookAppointmentForm) {
    bookAppointmentForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const appointmentData = {
        doctorId: document.getElementById("doctor-id").value,
        patientId: document.getElementById("patient-id").value,
        appointmentDate: document.getElementById("appointment-date").value,
        // Add more fields as needed
      };

      try {
        const response = await axios.post(`${BASE_URL}/api/appointments`, appointmentData);
        console.log("Appointment booked:", response.data);
        alert("Appointment booked successfully.");
      } catch (error) {
        console.error("Appointment booking error:", error);
        alert("Appointment booking failed. Please try again.");
      }
    });
  }

  // Appointment cancellation form submission
  const cancelAppointmentForm = document.getElementById("cancel-appointment-form");
  if (cancelAppointmentForm) {
    cancelAppointmentForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const appointmentId = document.getElementById("appointment-id").value;

      try {
        const response = await axios.delete(`${BASE_URL}/api/appointments/${appointmentId}`);
        console.log("Appointment cancelled:", response.data);
        alert("Appointment cancelled successfully.");
      } catch (error) {
        console.error("Appointment cancellation error:", error);
        alert("Appointment cancellation failed. Please try again.");
      }
    });
  }
});
