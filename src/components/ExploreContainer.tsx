import './ExploreContainer.css';

interface ContainerProps { }

const ExploreContainer: React.FC<ContainerProps> = () => {
  return (
    <div id="container">
      <strong>Welcome to Cold Therapy!</strong>
      <p>Your one-stop shop for the best ice cream.</p>
    </div>
  );
};

export default ExploreContainer;
