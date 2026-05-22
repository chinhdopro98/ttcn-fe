import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate, useSearchParams } from "react-router-dom";
import { confirmCheckoutSuccessApi } from "../api/bookingApi";

const PaymentSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("Thanh toán thành công.");

  useEffect(() => {
    const confirmPayment = async () => {
      const sessionId =
        searchParams.get("session_id") || searchParams.get("sessionId") || "";
      const bookingId = searchParams.get("bookingId") || undefined;

      if (sessionId) {
        const res = await confirmCheckoutSuccessApi(sessionId, bookingId);
        if (res?.message) {
          setMessage(res.message);
        }
      }

      setLoading(false);
    };

    confirmPayment();
  }, [searchParams]);

  const goToProducts = () => {
    sessionStorage.setItem("checkout_success_message", message);
    navigate("/app", {
      state: {
        paymentSuccess: true,
        paymentMessage: message,
      },
    });
  };

  return (
    <Box
      sx={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <Box
        sx={{
          maxWidth: "640px",
          width: "100%",
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          padding: "32px",
          textAlign: "center",
        }}
      >
        {loading ? (
          <>
            <CircularProgress />
            <Typography sx={{ marginTop: "16px" }}>
              Ðang xác nh?n thanh toán...
            </Typography>
          </>
        ) : (
          <>
            <CheckCircleOutlineIcon
              sx={{ fontSize: "72px", color: "#2e7d32", marginBottom: "12px" }}
            />
            <Typography variant="h5" sx={{ fontWeight: 700, marginBottom: "8px" }}>
              Thanh toán thành công
            </Typography>
            <Typography sx={{ marginBottom: "24px", color: "#546e7a" }}>
              {message}
            </Typography>
            <Button variant="contained" onClick={goToProducts}>
              V? trang s?n ph?m
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default PaymentSuccess;
