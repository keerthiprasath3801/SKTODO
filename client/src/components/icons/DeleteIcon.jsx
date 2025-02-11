const DeleteIcon = (props) => {
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
        className="group transition-all duration-200 ease-in-out transform hover:scale-110 hover:shadow-md"
        {...props}
      >
        {/* Trash bin body */}
        <path
          d="M3 6h18M5 6v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
          className="text-gray-900 group-hover:text-red-500" // Black by default, red on hover
        />
        {/* Trash bin lid handle */}
        <path
          d="M14 11v6M10 11v6"
          className="text-gray-900 group-hover:text-red-500" // Black by default, red on hover
        />
      </svg>
    );
  };
  
  export default DeleteIcon;