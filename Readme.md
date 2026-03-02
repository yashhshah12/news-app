.skeleton {
  background: linear-gradient(
    90deg,
    #e5e7eb 25%,
    #f3f4f6 37%,
    #e5e7eb 63%
  );
  background-size: 400% 100%;
  animation: shimmer 1.4s infinite;
}

@keyframes shimmer {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
}

.skeleton-card {
  height: 300px;
  border-radius: 12px;
}
  <div class="skeleton-card card">
               <div class="skeleton" style="height: 160px; width: 100%;"></div>
            <div style="padding: 14px;">
                <div class="skeleton" style="height: 20px; width: 80%; margin-bottom: 8px;"></div>
                <div class="skeleton" style="height: 15px; width: 60%;"></div>
            </div>


                </div>
