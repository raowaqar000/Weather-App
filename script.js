const input = document.querySelector("input");
const btn = document.querySelector("#btn");

const apikey = "8b93c561a9e0abbf3574fad3704c4aa7";
let cityname = "Bahawalpur";
const main = document.querySelector("#main");
let loading = false
let error = ""
const loader = `<p class="text-sm flex flex-col items-center justify-center"><i class="ri-loader-3-line animate-spin"></i>Loading...</p>`
btn.addEventListener("click", async () => {
  cityname = input.value;
  loading = true
  main.innerHTML = loader
  try {
    await fetchWeather(cityname)
  } catch (e) {
    error = e
  }finally{
    loading = false
  }
});
const fetchWeather = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;

  const response = await fetch(url, {
    method: "GET",
  });
  const jsonData = await response.json();
  console.log(jsonData);

  if (!response.ok) {
    const p = document.createElement("p");
    p.textContent = "Failed to get the Weather forecast";
    p.classList.add(
      "text-red-500",
      "p-2",
      "rounded-xl",
      "border-2",
      "border-white",
      "bg-red-200",
      "ring-2",
      "ring-red-500",
      "text-lg",
      "w-fit",
      "font-semibold",
      "mx-auto"
    );
    main.appendChild(p);
  }


  const htmlCard = `
  <div
        id="card"
        class="mx-auto flex flex-col items-center justify-center bg-zinc-100 max-w-md w-full p-4 rounded-xl shadow-xl"
      >
        <div id="head" class="flex flex-col items-center justify-center">
          <img src="/images/${jsonData.weather[0].main}.png" alt="" class="size-40" />
          <h1 class="text-5xl font-bold mt-4">${jsonData.main.temp}&deg;C</h1>
          <h4 class="text-xl font-semibold mt-1">${city}</h4>
        </div>
        <div id="footer" class="mt-4 w-full">
          <div id="humidity-det" class="flex items-center justify-between">
            <h5>Humidity</h5>
            <p>${jsonData.main.humidity}%</p>
          </div>
          <div id="wind-det" class="flex items-center justify-between">
            <h5>Wind</h5>
            <p>${jsonData.wind.speed} km/h</p>
          </div>
        </div>
      </div>`;
    
      main.innerHTML = htmlCard
};
main.innerHTML = loader; 
fetchWeather(cityname).then(()=>{
    loading = false
})