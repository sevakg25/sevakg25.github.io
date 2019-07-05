



INCREMENT=1
declare -a FOLDERS=("liverpool" "travels")

for i in "${FOLDERS[@]}"
do
	INCREMENT=1
	cd $i;
	echo $i
	for f in *
	do
		mv -n "$f" "${INCREMENT}.jpeg"
		INCREMENT=$((INCREMENT + 1))
	done
	cd ..;
done
