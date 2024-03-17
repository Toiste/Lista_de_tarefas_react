import React, { Component } from "react";
import "./Main.css";

import { FaPlus, FaWindowClose, FaEdit } from "react-icons/fa";

export default class Main extends Component {
  state = {
    novaTarefa: "",
    tarefa: [],
    index: -1,
  };

  componentDidMount() {
    const tarefa = JSON.parse(localStorage.getItem("tarefa"));

    if (!tarefa) return;

    this.setState({ tarefa });
  }

  componentDidUpdate(prevPops, prevState) {
    const { tarefa } = this.state;

    if (tarefa == prevState.tarefa) return;

    localStorage.setItem("tarefa", JSON.stringify(tarefa));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { tarefa, index } = this.state;
    let { novaTarefa } = this.state;
    novaTarefa = novaTarefa.trim();

    if (tarefa.indexOf(novaTarefa) != -1) return;

    const novasTarefas = [...tarefa];

    if (index == -1) {
      this.setState({
        tarefa: [...novasTarefas, novaTarefa],
        novaTarefa: "",
      });
    } else {
      novasTarefas[index] = novaTarefa;

      this.setState({
        tarefa: [...novasTarefas],
        index: -1,
      });
    }
  };

  handleEdit = (e, index) => {
    const { tarefa } = this.state;

    this.setState({
      index,
      novaTarefa: tarefa[index],
    });
  };

  handleDelete = (e, index) => {
    const { tarefa } = this.state;
    const novasTarefas = [...tarefa];
    novasTarefas.splice(index, 1);

    this.setState({
      tarefa: [...novasTarefas],
    });
  };

  handleChange = (e) => {
    this.setState({
      novaTarefa: e.target.value,
    });
  };

  render() {
    const { novaTarefa, tarefa } = this.state;

    return (
      <div className="main">
        <h1>Lista de Tarefas</h1>

        <form onSubmit={this.handleSubmit} action="#" className="form">
          <input onChange={this.handleChange} type="text" value={novaTarefa} />
          <button type="submit">
            <FaPlus />
          </button>
        </form>

        <ul className="tarefas">
          {tarefa.map((tarefas, index) => (
            <li key={tarefas}>
              {tarefas}
              <span>
                <FaEdit
                  className="edit"
                  onClick={(e) => this.handleEdit(e, index)}
                />

                <FaWindowClose
                  className="delete"
                  onClick={(e) => this.handleDelete(e, index)}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
