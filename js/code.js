const Game = {
  world: [],
  walk: 'x',
  count: 0,
  winner: null,
  x_score: 0,
  o_score: 0,

  init() {
    const size = 3;
    for (let i = 0; i < size; ++i) {
      const line = [];

      for (let j = 0; j < size; ++j) {
        line.push(' ');
        
        const game = document.querySelector('.game');
        const game_sq = document.createElement('div');
        game_sq.classList.add('game__sq');

        game_sq.dataset.i = i;
        game_sq.dataset.j = j;
        this.add_listener(game_sq);
        game.appendChild(game_sq);
      }

      this.world.push(line);
    }
  },

  add_listener(elem) {
    elem.onclick = () => {
      const i = elem.dataset.i;
      const j = elem.dataset.j;

      if (this.world[i][j] != ' ') { return; }

      ++this.count;
      this.world[i][j] = this.walk;
      elem.classList.add(`game__sq_${this.walk}`);

      this.walk = this.walk == 'x' ? 'o' : 'x';
      this.world_check();
    }
  },

  world_check() {
    if (this.check_horizontal() || this.check_vertical() || 
        this.check_corner() || this.count == 9) {
      this.reset();
    }
  },

  check_vertical() {
    for (let i = 0; i < 3; ++i) {
      if (this.world[i][0] != ' ' &&(this.world[i][0] == this.world[i][1] && this.world[i][1] == this.world[i][2])) {
        this.winner = this.world[i][0];
        return true;
      }
    }

    return false;
  },

  check_horizontal() {
    for (let i = 0; i < 3; ++i) {
      if (this.world[0][i] != ' ' && (this.world[0][i] == this.world[1][i] && this.world[1][i] == this.world[2][i])) {
        this.winner = this.world[0][i];
        return true;
      }
    }

    return false;
  },

  check_corner() {
    if (this.world[1][1] == ' ') { return false; }

    if ((this.world[0][0] == this.world[1][1] && this.world[1][1] == this.world[2][2]) ||
        (this.world[0][2] == this.world[1][1] && this.world[1][1] == this.world[2][0])) {
      this.winner = this.world[1][1];
      return true;
    }

    return false;
  },

  reset() {
    this.clear_world();
    this.clear_classes('game__sq_o');
    this.clear_classes('game__sq_x');
    this.calculate_score();
    this.walk = 'x';
    this.count = 0;
    this.winner = null;
  },

  calculate_score() {
    if (this.winner == null) { return; }

    switch(this.winner) {
      case 'x': this.update_score_element('x', ++this.x_score); break;
      case 'o': this.update_score_element('o', ++this.o_score); break;
      default: return;
    }
  },

  update_score_element(element, score) {
    document.querySelector(`.score_${element}`).innerHTML = score;
  },

  clear_world() { 
    for (let i = 0; i < this.world.length; ++i) {
      this.world[i].fill(' ');
    }
  },

  clear_classes(class_name) {
    const class_x = document.querySelectorAll(`.${class_name}`);
    for (let i = 0; i < class_x.length; ++i) {
      class_x[i].classList.remove(class_name);
    }
  },
}

Game.init();