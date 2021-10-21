let app = new Vue({
    el: '#app',
    data: {
        number: '',
        max: '',
        current: {
            title: '',
            img: '',
            alt: ''
        },
        loading: true,
        addedName: '',
        addedComment: '',
        addedDate: '',
        comments: {},
    },
    created() {
      this.xkcd();
    },
    methods: {
        async xkcd() {
            try {
              this.loading = true;
              let url = 'https://xkcd.now.sh/?comic=';
              if (this.number === '') {
                url += 'latest';
              } else {
                url += this.number;
              }
              const response = await axios.get(url);
              this.current = response.data;
              this.loading = false;
              this.number = response.data.num;
            } catch (error) {
                this.number = this.max;
            }
        },
        previousComic() {
            this.number = this.current.num - 1;
            if (this.number < 1)
              this.number = 1;
        },
        nextComic() {
            this.number = this.current.num + 1;
            if (this.number > this.max)
              this.number = this.max
        },
        firstComic() {
            this.number = 1;
        },
        lastComic() {
            this.number = this.max
        },
        getRandom(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum and minimum are inclusive
        },
        randomComic() {
            this.number = this.getRandom(1, this.max);
        },
        addComment() {
            if (!(this.number in this.comments))
              Vue.set(app.comments, this.number, new Array);

            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();
            var hour = today.getHours();
            var minute = today.getMinutes();
            var second = today.getSeconds();
            
            this.addedDate = 'Posted on ' + mm + '/' + dd + '/' + yyyy + ' at ' + hour + ':' + minute + ':' + second;
            //this.addedDate = today;

            this.comments[this.number].push({
              author: this.addedName,
              text: this.addedComment,
              date: this.addedDate,
            });

            this.addedName = '';
            this.addedComment = '';
            this.addedDate = '';
        },
    },
    computed: {
        month() {
          var month = new Array;
          if (this.current.month === undefined)
            return '';
          month[0] = "January";
          month[1] = "February";
          month[2] = "March";
          month[3] = "April";
          month[4] = "May";
          month[5] = "June";
          month[6] = "July";
          month[7] = "August";
          month[8] = "September";
          month[9] = "October";
          month[10] = "November";
          month[11] = "December";
          return month[this.current.month - 1];
        }
      },
    watch: {
        number(value, oldvalue) {
            if (oldvalue === '') {
                this.max = value;
            } else {
                this.xkcd();
            }
        },
    },   
  });
  