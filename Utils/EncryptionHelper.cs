using System.Security.Cryptography;
using System.Text;


namespace StarterKit.Utils
{
    public static class EncryptionHelper
    {
        // The function takes a password, encrypts it using a hashing method called SHA-256, and tries to return it as a string
        public static string EncryptPassword(string password)
        {
            SHA256 mySha565 = SHA256.Create();
            return Encoding.Default.GetString(mySha565.ComputeHash(Encoding.ASCII.GetBytes(password)));
        }
    }
}