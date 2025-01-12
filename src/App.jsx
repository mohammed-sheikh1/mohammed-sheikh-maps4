import { useState, useEffect } from "react";
import "./App.css";
import "./index.css";

function App() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedTours, setExpandedTours] = useState({});

  const fetchTours = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://www.course-api.com/react-tours-project"
      );
      const data = await response.json();
      setTours(data);
      setLoading(false);
    } catch (error) {
      setError("حدث خطأ في جلب البيانات");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const toggleTourInfo = (tourId) => {
    setExpandedTours((prev) => ({
      ...prev,
      [tourId]: !prev[tourId],
    }));
  };

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold">جاري التحميل...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold text-red-500">{error}</h2>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">رحلاتنا السياحية</h1>
      {tours.length === 0 ? (
        <div className="text-center">
          <h2 className="text-2xl mb-4">لا توجد رحلات متاحة</h2>
          <button
            onClick={() => fetchTours()}
            className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition"
          >
            تحديث الرحلات
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour) => (
            <article
              key={tour.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden relative"
            >
              <div className="relative">
                <img
                  src={tour.image}
                  alt={tour.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-0 right-0 bg-lime-700 text-white px-4 py-2 rounded-bl-lg font-bold">
                  ${tour.price}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">{tour.name}</h2>
                </div>
                <p className="text-gray-600 mb-4">
                  {expandedTours[tour.id]
                    ? tour.info
                    : `${tour.info.substring(0, 200)}...`}
                  <button
                    onClick={() => toggleTourInfo(tour.id)}
                    className="text-blue-500 hover:text-blue-700 mr-2 font-medium"
                  >
                    {expandedTours[tour.id] ? "عرض أقل" : "المزيد"}
                  </button>
                </p>
                <button
                  onClick={() => removeTour(tour.id)}
                  className="w-full bg-yellow-400 text-white py-2 px-4 rounded hover:bg-red-600 transition"
                >
                  حذف الرحلة
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default App;
