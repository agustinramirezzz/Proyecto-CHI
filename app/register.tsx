import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Linking } from "react-native";
import { auth, db } from "../services/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Notificacion from "./notificacion";

type RegisterProps = {
  setIsRegistering: (value: boolean) => void;
};

export default function Register({ setIsRegistering }: RegisterProps) {
  const [username, setUsername] = useState("");
  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async () => {
    if (!username || !dni || !email || !phone || !password || !confirmPassword) {
      setErrorMessage("Todos los campos deben ser completados.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden");
      return;
    }
    if (!acceptedTerms) {
      setErrorMessage("Debes aceptar los términos y condiciones");
      return;
    }
    try {
      // Crear el usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Guardar los datos del usuario en Firestore
      await setDoc(doc(db, "users", user.uid), {
        username,
        dni,
        email,
        phone,
      });

      // Redirigir al login solo si el registro es exitoso
      setIsRegistering(false);
      setErrorMessage(""); // Limpiar el mensaje de error si el registro es exitoso
    } catch (error) {
      console.error("Error en el registro:", error);
      if (error instanceof Error) {
        setErrorMessage(error.message); // Usa el mensaje de error específico
      } else {
        setErrorMessage("Error en el registro. Intenta de nuevo.");
      }
    }
  };

  return (
    <View style={styles.container}>
      {errorMessage ? <Notificacion mensaje={errorMessage} /> : null}
      <Text style={styles.title}>Registro</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="DNI"
        value={dni}
        onChangeText={setDni}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Número telefónico"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Repetir contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          onPress={() => setAcceptedTerms(!acceptedTerms)}
          style={styles.checkbox}
        >
          {/* Mostrar emoji ✅ si los términos han sido aceptados */}
          {acceptedTerms && <Text style={styles.checkboxText}>✅</Text>}
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>
          Acepto{" "}
          <Text style={styles.link} onPress={() => Linking.openURL("https://example.com/terms")}>
            términos y condiciones
          </Text>
        </Text>
      </View>
      <TouchableOpacity onPress={() => setIsRegistering(false)}>
        <Text style={styles.link}>¿Ya tienes una cuenta? Inicia sesión aquí</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#404aa3",
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    backgroundColor: "#fff",
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#737bfd",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  link: {
    color: "#fff",
    textDecorationLine: "underline",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checkboxText: {
    fontSize: 14, // Tamaño del emoji
  },
  checkboxLabel: {
    color: "#fff",
  },
});
