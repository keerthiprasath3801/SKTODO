const TickIcon = (props) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="group transition-colors duration-200 ease-in-out"
        {...props}
      >
        {/* Circle background */}
        <circle
          cx="12"
          cy="12"
          r="10"
          fill="currentColor"
          className="text-gray-900 group-hover:text-green-500" // Black by default, green on hover
        />
        {/* Tick mark */}
        <path
          d="M9 12l2 2 4-4"
          stroke="currentColor"
          strokeWidth={2}
          className="text-white group-hover:text-white" // White tick (contrasts with circle)
        />
      </svg>
    );
  };
  
  export default TickIcon;