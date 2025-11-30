export async function load({ params }) {
    let data = Object.keys(import.meta.glob("../../../static/musiques/*"))
	for (let i in data){
		data[i] = data[i].replace("../../../static","")
	}
	return {
		library: data
	};
}