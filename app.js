new Vue({
  el: "#app",
  data: {
    activeTab: "length",
    lengthValue: 0,
    lengthFrom: "m",
    lengthTo: "km",
    weightValue: 0,
    weightFrom: "miligramo",
    weightTo: "gramo",
    temperatureValue: 0,
    temperatureFrom: "celsius",
    temperatureTo: "fahrenheit",
    result: null,
  },
  methods: {
    convertLength() {
      const conversionRates = {
        mm: 0.001,
        cm: 0.01,
        m: 1,
        km: 1000,
        inch: 0.0254,
        foot: 0.3048,
        yard: 0.9144,
        mile: 1609.34,
      };
      const fromRate = conversionRates[this.lengthFrom];
      const toRate = conversionRates[this.lengthTo];
      const convertedValue = (this.lengthValue * fromRate) / toRate;
      this.result = `${this.lengthValue} ${this.lengthFrom} = ${convertedValue} ${this.lengthTo}`;
    },
    convertWeight() {
      const conversionWeight = {
        miligramo: 1,
        gramo: 1000,
        kilogramo: 1000000,
        onza: 28349.5231, // Más preciso
        libra: 453592.37, // Más preciso
      };
      const fromRate = conversionWeight[this.weightFrom];
      const toRate = conversionWeight[this.weightTo];

      const convertedValue = this.weightValue * fromRate;

      this.result = `${this.weightValue} ${this.weightFrom} = ${
        convertedValue / toRate
      } ${this.weightTo}`;
    },
    convertTemperature() {
        // Mapa de conversiones de cada unidad a grados Celsius
        const toCelsius = {
          celsius: (value) => value,
          fahrenheit: (value) => ((value - 32) * 5) / 9,
          kelvin: (value) => value - 273.15,
        };
  
        // Mapa de conversiones de grados Celsius a cada unidad
        const fromCelsius = {
          celsius: (value) => value,
          fahrenheit: (value) => (value * 9) / 5 + 32,
          kelvin: (value) => value + 273.15,
        };
  
        // Verificar y realizar la conversión
        if (this.temperatureFrom in toCelsius && this.temperatureTo in fromCelsius) {
          const valueInCelsius = toCelsius[this.temperatureFrom](this.temperatureValue);
          const convertedValue = fromCelsius[this.temperatureTo](valueInCelsius);
          this.result = `${this.temperatureValue} ${this.temperatureFrom} = ${convertedValue.toFixed(2)} ${this.temperatureTo}`;
        } else {
          this.result = 'Unidades de temperatura no válidas.';
        }
      },
      convert() {
          
      if (this.activeTab === "length" && this.lengthValue !== 0) {
        this.convertLength();
      } else if (this.activeTab === "weight" && this.weightValue !== 0) {
        this.convertWeight();
      } else if (
        this.activeTab === "temperature" &&
        this.temperatureValue !== 0
      ) {
        this.convertTemperature();
      } else {
        this.result = "Por favor, ingrese un valor para convertir.";
      }
    },
    reset() {
      this.lengthValue = 0;
      this.weightValue = 0;
      this.temperatureValue = 0;
      this.result = null;
    },
    changeTab(tab) {
      this.activeTab = tab;
      this.result = null;
    },
  },
});
