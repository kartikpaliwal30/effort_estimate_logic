import React, { useState } from 'react';
import componentsData from './data/components.json';

function App() {
  const [numScreens, setNumScreens] = useState(0);
  const [screens, setScreens] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  const handleNumScreensChange = (event) => {
    const num = parseInt(event.target.value);
    setNumScreens(num);
    initializeScreens(num);
  };

  const initializeScreens = (num) => {
    const newScreens = Array.from({ length: num }, () => ({
      components: [{ component: '', frequency: 0 }],
    }));
    setScreens(newScreens);
    setTotalValue(0);
  };

  const handleComponentChange = (screenIndex, componentIndex, component) => {
    const updatedScreens = [...screens];
    const updatedScreen = { ...updatedScreens[screenIndex] };
    updatedScreen.components[componentIndex] = {
      component: component,
      frequency: 0,
    };
    updatedScreens[screenIndex] = updatedScreen;
    setScreens(updatedScreens);
  };

  const handleFrequencyChange = (screenIndex, componentIndex, frequency) => {
    const updatedScreens = [...screens];
    const updatedScreen = { ...updatedScreens[screenIndex] };
    updatedScreen.components[componentIndex].frequency = parseInt(frequency);
    updatedScreens[screenIndex] = updatedScreen;
    setScreens(updatedScreens);
  };

  const addComponentDropdown = (screenIndex) => {
    const updatedScreens = [...screens];
    const updatedScreen = { ...updatedScreens[screenIndex] };
    updatedScreen.components.push({ component: '', frequency: 0 });
    updatedScreens[screenIndex] = updatedScreen;
    setScreens(updatedScreens);
  };

  const calculateTotalValue = () => {
    let total = 0;
    screens.forEach((screen) => {
      screen.components.forEach((component) => {
        const { component: componentName, frequency } = component;
        const componentData = componentsData.find(
          (data) => Object.keys(data)[0] === componentName
        );
        if (componentData) {
          total += componentData[componentName] * frequency;
        }
      });
    });
    setTotalValue(total);
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <label>
        Number of Screens:
        <input
          type="number"
          min={0}
          value={numScreens}
          onChange={handleNumScreensChange}
        />
      </label>
      {screens.map((screen, screenIndex) => (
        <div key={screenIndex}>
          <h3>Screen {screenIndex + 1}</h3>
          {screen.components.map((component, componentIndex) => (
            <div key={componentIndex}>
              <select
                value={component.component}
                onChange={(event) =>
                  handleComponentChange(
                    screenIndex,
                    componentIndex,
                    event.target.value
                  )
                }
              >
                <option value="">Select Component</option>
                {componentsData.map((data, index) => {
                  const componentName = Object.keys(data)[0];
                  return (
                    <option key={index} value={componentName}>
                      {componentName}
                    </option>
                  );
                })}
              </select>
              {component.component && (
                <>
                  <input
                    type="number"
                    min={1}
                    value={component.frequency}
                    onChange={(event) =>
                      handleFrequencyChange(screenIndex, componentIndex, event.target.value)
                    }
                    placeholder="Enter Frequency"
                  />
                  {componentIndex === screen.components.length - 1 && (
                    <button onClick={() => addComponentDropdown(screenIndex)}>
                      +
                    </button>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      ))}
      <button onClick={calculateTotalValue}>Calculate Total</button>
      <h4>Total Value: {totalValue}</h4>
    </div>
  );
}

export default App;















