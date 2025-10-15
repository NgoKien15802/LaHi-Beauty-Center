import { useState } from "react";
import { toast } from "react-toastify";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby0pwd8wiyCge4yMeAaWS5cKXPXk7-z1oNJJ_-lMgsHRWG0amDLmlfV7NnWUqo2jQOz/exec";

export const useFormSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const showToast = (message, type = "success") => {
    if (type === "success") toast.success(message);
    else toast.error(message);
  };

  const submitToGoogleSheets = async (formData) => {
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const timestamp = new Date().toLocaleString('vi-VN', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: false 
      });

      const bodyData = {
        timestamp: encodeURIComponent(timestamp),
      };

      Object.keys(formData).forEach(key => {
        if (key.includes('fullname')) {
          bodyData.Fullname = encodeURIComponent(formData[key]);
        } else if (key.includes('phone')) {
          bodyData.PhoneNumber = `'${formData[key]}`;
        }
      });

      const body = Object.keys(bodyData)
        .map(key => `${key}=${bodyData[key]}`)
        .join('&');

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body,
      });

      const data = await response.text();
      console.log("Success:", data);
      
      setSubmitMessage("Gửi thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.");
      showToast("Gửi thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.", "success");
      return { success: true, data };
      
    } catch (error) {
      console.error("Error:", error);
      setSubmitMessage("Có lỗi xảy ra, vui lòng thử lại sau.");
      showToast("Có lỗi xảy ra, vui lòng thử lại sau.", "error");
      return { success: false, error };
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormSubmit = async (e, formFields) => {
    e.preventDefault();
    
    const formData = {};
    let isValid = true;

    // Validate và lấy data từ các field
    Object.keys(formFields).forEach(fieldName => {
      const field = e.target.querySelector(`#${fieldName}`);
      if (field) {
        const value = field.value.trim();
        if (!value) {
          isValid = false;
          setSubmitMessage(`Vui lòng nhập ${formFields[fieldName]}`);
        }
        formData[fieldName] = value;
      }
    });

    if (!isValid) return;

    if (formData.phone) {
      formData.phone = "'" + formData.phone.toString();
    }

    return await submitToGoogleSheets(formData);
  };

  return {
    isSubmitting,
    submitMessage,
    handleFormSubmit,
    submitToGoogleSheets,
    setSubmitMessage
  };
};
