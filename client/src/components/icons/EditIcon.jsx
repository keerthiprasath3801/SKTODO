const EditIcon = (props) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={3} // Increased stroke width for a bolder look
        strokeLinecap="round"
        strokeLinejoin="round"
        className="group transition-all duration-300 ease-in-out transform hover:scale-110 hover:rotate-12 hover:shadow-lg"
        {...props}
      >
        {/* Circle background */}
        <circle
          cx="12"
          cy="12"
          r="10"
          fill="currentColor"
          className="text-gray-800 group-hover:text-purple-500 transition-colors duration-300" // Dark circle, changes to blue on hover
        />
        {/* Pencil icon */}
        <path
          d="M16 2l6 6-9 9H7v-6L16 2z"
          stroke="currentColor"
          strokeWidth={2}
          className="text-white group-hover:text-white transition-colors duration-300" // White pencil, stays white even on hover
        />
      </svg>
    );
  };
  
  export default EditIcon;
  