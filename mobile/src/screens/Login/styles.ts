import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  logoImg: {
    marginTop: 80,
    width: 300,
  },
  title: {
    fontSize: 50,
    textAlign: 'center',
    fontWeight: '500',
  },
  loginForm: {
    marginTop: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 8,
  },
  label: {
    marginBottom: 5,
    marginTop: 5,
    fontSize: 20,
  },
  input: {
    backgroundColor: '#eee',
    width: 400,
    borderRadius: 4,
    padding: 8,
    fontSize: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  loginButton: {
    width: 400,
    backgroundColor: '#2c3e50',
    padding: 10,
    marginTop: 20,
    alignItems: 'center',
    borderRadius: 8,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 20,
  },

  registerButton: {
    width: 400,
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  registerButtonText: {
    color: '#2c3e50',
    fontSize: 20,
    textDecorationLine: 'underline',
  },
  loginContainer: {},
});
