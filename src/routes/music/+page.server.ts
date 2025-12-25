export async function load({ params }) {
    let data = Object.keys(import.meta.glob("../../../static/musiques/*"))

	let library : musictype[] = []

	interface musictype {
		src: string;
		caption?: string;
		cover?: string;
	}

	for (let i in data){

		library.push({
			src:data[i].replace("../../../static",""),
			caption:data[i].replace("../../../static","")
		})
	}

	return {
		library
	};
}