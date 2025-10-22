import CryptoJS from 'crypto-js'

const SECRET_KEY = import.meta.env.VITE_APP_SECRET_KEY || 'default_secret_key' 
// ⚠️ Best practice: Store your key in .env file, not directly in code.

export function useEncryption() {

  // Encrypt data
  const encryptData = (data) => {
    const stringData = JSON.stringify(data)
    return CryptoJS.AES.encrypt(stringData, SECRET_KEY).toString()
  }

  // Decrypt data
  const decryptData = (ciphertext) => {
    try {
      const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY)
      const decryptedString = bytes.toString(CryptoJS.enc.Utf8)
      return JSON.parse(decryptedString)
    } catch (error) {
      console.error('Decryption failed:', error)
      return null
    }
  }

  // Save to localStorage (encrypted)
  const saveToLocalStorage = (key, value) => {
    const encrypted = encryptData(value)
    localStorage.setItem(key, encrypted)
  }

  // Retrieve and decrypt from localStorage
  const getFromLocalStorage = (key) => {
    const encrypted = localStorage.getItem(key)
    if (!encrypted) return null
    return decryptData(encrypted)
  }

  // Remove item
  const removeFromLocalStorage = (key) => {
    localStorage.removeItem(key)
  }

  return {
    encryptData,
    decryptData,
    saveToLocalStorage,
    getFromLocalStorage,
    removeFromLocalStorage
  }
}
