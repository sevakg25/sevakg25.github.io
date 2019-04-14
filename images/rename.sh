
INCREMENT=1
declare -a FOLDERS=("football" "liverpool" "travels")
# echo ${FOLDERS[1]}
# echo ${FOLDERS[2]}

for i in "${FOLDERS[@]}"
do
	INCREMENT=1
	cd $i;
	echo $i
	for f in *.jpeg
	do
		# echo "$f";
		mv "$f" "${INCREMENT}.jpeg"
		INCREMENT=$((INCREMENT + 1))
	done
	cd ..;
done

# for f in *.jpeg
# do
	# mv "$f" "$INCREMENT.jpeg" 
# 	INCREMENT=$((INCREMENT + 1))
# done
