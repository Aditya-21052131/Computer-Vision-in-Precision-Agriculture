import React, { useState } from 'react';
import { Bone as Drone, Leaf, Bug, Droplets, LineChart, Brain, Upload, Search, AlertCircle } from 'lucide-react';

function FeatureCard({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
        <Icon className="w-6 h-6 text-green-600" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function DemoAnalysis() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setSelectedFile(file);
        setError(null);
      } else {
        setError('Please select an image file');
        setSelectedFile(null);
      }
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    
    setAnalyzing(true);
    setResults(null);
    setError(null);

    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock results
    setResults('Analysis Complete! \n• Crop Health: 85% Healthy\n• Water Stress: Low\n• Pest Risk: Minimal\n• Recommended Action: Continue current irrigation schedule');
    setAnalyzing(false);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold mb-6">Try Demo Analysis</h3>
      
      <div className="space-y-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex flex-col items-center space-y-2"
          >
            <Upload className="w-8 h-8 text-gray-400" />
            <span className="text-sm text-gray-500">
              {selectedFile ? selectedFile.name : 'Upload drone imagery for analysis'}
            </span>
          </label>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-600">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        <button
          onClick={handleAnalyze}
          disabled={!selectedFile || analyzing}
          className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors
            ${!selectedFile || analyzing
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
            }`}
        >
          {analyzing ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Analyzing...
            </span>
          ) : (
            'Analyze Image'
          )}
        </button>

        {results && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <pre className="whitespace-pre-wrap text-sm">{results}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

function InteractiveMap() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const regions = [
    { id: '1', name: 'North Field', health: 85 },
    { id: '2', name: 'South Field', health: 92 },
    { id: '3', name: 'East Field', health: 78 },
    { id: '4', name: 'West Field', health: 88 },
  ];

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold mb-6">Field Health Map</h3>
      <div className="grid grid-cols-2 gap-4">
        {regions.map(region => (
          <button
            key={region.id}
            onClick={() => setSelectedRegion(region.id)}
            className={`p-4 rounded-lg transition-colors ${
              selectedRegion === region.id
                ? 'bg-green-100 border-2 border-green-500'
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <h4 className="font-semibold">{region.name}</h4>
            <div className="mt-2 flex items-center gap-2">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-green-600 h-2.5 rounded-full"
                  style={{ width: `${region.health}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-600">{region.health}%</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Computer Vision in Precision Agriculture
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Advanced crop monitoring and analysis using drone imagery and artificial intelligence
          </p>
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl mb-8">
            <img
              src="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=1200&q=80"
              alt="Drone flying over agricultural field"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* Interactive Demo Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Try Our Technology</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <DemoAnalysis />
          <InteractiveMap />
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <FeatureCard
            icon={Drone}
            title="Aerial Imaging"
            description="High-resolution drone imagery capture for comprehensive field analysis"
          />
          <FeatureCard
            icon={Brain}
            title="AI Analysis"
            description="Advanced machine learning algorithms for precise crop health assessment"
          />
          <FeatureCard
            icon={Leaf}
            title="Crop Health Monitoring"
            description="Real-time vegetation health indices and stress detection"
          />
          <FeatureCard
            icon={Bug}
            title="Pest Detection"
            description="Early identification of pest infestations and disease outbreaks"
          />
          <FeatureCard
            icon={Droplets}
            title="Irrigation Planning"
            description="Smart irrigation recommendations based on moisture analysis"
          />
          <FeatureCard
            icon={LineChart}
            title="Yield Prediction"
            description="Data-driven crop yield forecasting and optimization"
          />
        </div>
      </section>

      {/* Technical Details */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Technical Implementation</h2>
            <div className="space-y-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Image Segmentation</h3>
                <p className="text-gray-600">
                  Implemented advanced computer vision algorithms using OpenCV and TensorFlow
                  for precise field segmentation and crop analysis. The system processes
                  multispectral imagery to identify various crop health indicators.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Machine Learning Pipeline</h3>
                <p className="text-gray-600">
                  Developed a robust ML pipeline using Python and TensorFlow for automated
                  detection of irrigation needs and pest control requirements. The system
                  learns from historical data to improve accuracy over time.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Real-time Analysis</h3>
                <p className="text-gray-600">
                  Built a real-time processing system that can analyze drone imagery on-the-fly,
                  providing immediate insights to farmers and agricultural specialists for
                  quick decision-making.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            © 2024 Computer Vision in Precision Agriculture. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;