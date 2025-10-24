import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_LINK_SUPABASE;
const key = import.meta.env.VITE_SUPABASE_APIKEY;

const supabase = createClient(url, key);

export default function mediaUpload(file) {
  const mediaUploadPromise = new Promise((resolve, reject) => {
    if (file == null) {
      reject("No file selected");
      return;
    }

    // Generate unique file name using timestamp
    const timeStamp = new Date().getTime();
    const newName = timeStamp + "_" + file.name;

    supabase.storage
      .from("uhbrand")
      .upload(newName, file, {
        cacheControl: "3600",
        upsert: false,
      })
      .then((uploadResult) => {
        // Check if upload was successful
        if (uploadResult.error) {
          console.error("Upload error:", uploadResult.error);
          reject("Upload failed: " + uploadResult.error.message);
          return;
        }

        // Get public URL
        const { data } = supabase.storage.from("uhbrand").getPublicUrl(newName);

        resolve(data.publicUrl);
      })
      .catch((error) => {
        console.error("Supabase error:", error);
        reject("Error occurred in supabase connection: " + error.message);
      });
  });

  return mediaUploadPromise;
}
